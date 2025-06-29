import { FC, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';
import {
  useGetConversationScreen,
  useGetDirectMessageScreen,
  useSendDmMessage,
  useSendFirstMessage,
  useSendMessage,
} from './hooks';
import HeadingText from '@/components/Texts/HeadingText';
import Message from '@/components/Inbox/Message';
import { useAuth } from '@/contexts/AuthContext';
import Color from '@/constants/Color';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlazaTextInput from '@/components/PlazaTextInput';
import Spacing from '@/constants/Spacing';
import Radius from '@/constants/Radius';
import { ChevronUp } from '@/components/Icons';
import { StyleSheet } from 'react-native';
import BackButton from '@/components/Buttons/BackButton';
import { supabase } from '@/utils/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { ChatScreen } from './models';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import ProfileIcon from '@/components/ProfileIcon';

interface ChatProps {
  conversationId?: Id;
  userId?: Id;
}

const Chat: FC<ChatProps> = ({ conversationId, userId }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Hooks used if the user is in a conversation
  const { data: conversationScreen, error: conversationScreenError } =
    useGetConversationScreen(conversationId);
  const { mutate: sendMessage } = useSendMessage(conversationId);

  // Hooks used if the user is in a direct message
  const { data: directMessageScreen, error: directMessageScreenError } =
    useGetDirectMessageScreen(userId);
  const { mutate: sendDmMessage } = useSendDmMessage(
    directMessageScreen?.id ?? undefined
  );
  const { mutate: sendFirstMessage } = useSendFirstMessage(userId);

  const [content, setContent] = useState('');
  const inputRef = useRef<TextInput>(null);

  const screenData = conversationScreen ?? directMessageScreen;

  const handleSubmit = async () => {
    if (content === '') return;

    if (conversationId) {
      sendMessage(content);
    } else if (directMessageScreen?.id) {
      sendDmMessage(content);
    } else {
      sendFirstMessage(content);
    }

    inputRef.current?.blur();
    inputRef.current?.clear();
    setContent('');
  };

  const members = screenData?.members ?? [];

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`messages_in_${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          queryClient.setQueryData<ChatScreen>(
            ['chatScreen', conversationId, user?.id],
            (oldData) => {
              if (!oldData) return oldData;

              const newMessage = {
                id: payload.new.id,
                content: payload.new.content,
                senderId: payload.new.user_id,
                profileImageUrl:
                  members.find((member) => member.id === payload.new.user_id)
                    ?.profileImageUrl ?? null,
                createdAt: payload.new.created_at,
              };

              const newMessages = [newMessage, ...oldData.messages];

              return {
                ...oldData,
                messages: newMessages,
              };
            }
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, user?.id]);

  useEffect(() => {
    if (!directMessageScreen?.id) return;

    const channel = supabase
      .channel(`dm_messages_in_${directMessageScreen.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'dm_conversation_message',
          filter: `dm_conversation_id=eq.${directMessageScreen.id}`,
        },
        (payload) => {
          queryClient.setQueryData<ChatScreen>(
            ['chatScreen', userId, user?.id],
            (oldData) => {
              if (!oldData) return oldData;

              const newMessage = {
                id: payload.new.id,
                content: payload.new.content,
                senderId: payload.new.user_id,
                profileImageUrl:
                  members.find((member) => member.id === payload.new.user_id)
                    ?.profileImageUrl ?? null,
                createdAt: payload.new.created_at,
              };

              const newMessages = [newMessage, ...oldData.messages];

              return {
                ...oldData,
                messages: newMessages,
              };
            }
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [directMessageScreen?.id, user?.id]);

  const messages = screenData?.messages ?? [];

  const handlePress = () => {
    if (userId) {
      router.push({
        pathname: '/profile-modal',
        params: {
          id: userId,
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <BackButton />
          {userId ? (
            <PressableOpacity
              onPress={handlePress}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <ProfileIcon
                variant="user"
                url={screenData?.imageUrl || undefined}
              />

              <HeadingText variant="h6-bold">{screenData?.name}</HeadingText>
            </PressableOpacity>
          ) : (
            <>
              <ProfileIcon
                variant="user"
                url={screenData?.imageUrl || undefined}
              />

              <HeadingText variant="h6-bold">{screenData?.name}</HeadingText>
            </>
          )}
        </View>
        {screenData?.isBlocked ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <HeadingText variant="h6-bold">
              You have blocked this user
            </HeadingText>
          </View>
        ) : (
          <>
            <FlashList
              data={messages}
              contentContainerStyle={{ padding: 16 }}
              renderItem={({ item }) => (
                <View
                    style={{ marginTop: 16 }}
                  >
                <Message
                  senderId={item.senderId}
                  profileImageUrl={item.profileImageUrl}
                  content={item.content}
                  createdAt={item.createdAt}
                  isCurrentUser={item.senderId === user?.id}
                />
                </View>
              )}
              inverted
            />
            <View style={styles.inputContainer}>
              <PlazaTextInput
                inputRef={inputRef}
                placeholder="Send a message"
                style={{ flex: 1 }}
                onChangeText={setContent}
                rightButton={
                  <PressableOpacity
                    onPress={handleSubmit}
                    style={{
                      backgroundColor: content
                        ? Color.PRIMARY_DEFAULT
                        : Color.NEUTRALS_DEFAULT,
                      padding: Spacing.SPACING_1,
                      borderRadius: Radius.LG,
                    }}
                  >
                    <ChevronUp color={Color.WHITE} />
                  </PressableOpacity>
                }
                multiline
              />
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    borderColor: Color.NEUTRALS_DEFAULT,
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: Color.NEUTRALS_200,
  },
});
