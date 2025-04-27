import { Alert, StyleSheet, Switch, View } from 'react-native';
import React, { FC, useMemo, useState } from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import HeadingText from '@/components/Texts/HeadingText';
import PlazaTextInput from '@/components/PlazaTextInput';
import Spacing from '@/constants/Spacing';
import PlazaButton from '@/components/Buttons/PlazaButton';
import { Formik } from 'formik';
import { productReportSchema, videoReportSchema } from '../yupSchemas';
import BodyText from '@/components/Texts/BodyText';
import Color from '@/constants/Color';
import ThankYou from '../components/ThankYou';
import { createProductReport } from '../services';
import { useAuth } from '@/contexts/AuthContext';

interface ProductReportModalProps {
  // Define any props if needed
  productId: Id;
  bottomSheetRef?: React.RefObject<BottomSheetModal>;
}

const ProductReportModal: FC<ProductReportModalProps> = ({
  productId,
  bottomSheetRef,
}) => {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const snapPoints = useMemo(() => ['50%'], []);
  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      )}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <HeadingText variant="h6-bold">Report Product</HeadingText>

        <Formik
          initialValues={{ reason: '', anonymous: true }}
          onSubmit={async (values) => {
            // Handle report submission logic here
            try {
              await createProductReport({
                reporteeId: productId,
                reason: values.reason,
                reporterId: values.anonymous ? null : user.id, // Replace with actual user ID
              });
              // Close the modal after submission
              setSubmitted(true);
              setTimeout(() => {
                bottomSheetRef?.current?.close();
                setSubmitted(false);
              }, 2000); // Close after 2 seconds to show thank you message
            } catch (e) {
              console.error(e);
              Alert.alert(
                'Error',
                'There was an error submitting your report. Please try again later.'
              );
            }
          }}
          validationSchema={productReportSchema}
        >
          {({ handleSubmit, handleChange, errors, setFieldValue, values }) => (
            <>
              <View style={{ width: '90%', marginTop: Spacing.SPACING_3 }}>
                <PlazaTextInput
                  onChangeText={handleChange('reason')}
                  label="Reason for Reporting"
                  placeholder="Enter reason for reporting"
                  multiline
                  numberOfLines={4}
                  style={{ height: 60 }}
                />
                {errors.reason && (
                  <BodyText
                    variant="sm"
                    color={Color.RED_400}
                    style={{ marginTop: Spacing.SPACING_1 }}
                  >
                    {errors.reason}
                  </BodyText>
                )}
              </View>

              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: Spacing.SPACING_3,
                }}
              >
                <BodyText variant="md">Report Anonymously</BodyText>
                <Switch
                  trackColor={{
                    false: Color.GREY_300,
                    true: Color.PRIMARY_100,
                  }}
                  thumbColor={
                    values.anonymous ? Color.PRIMARY_DEFAULT : Color.GREY_500
                  }
                  onValueChange={(value) => {
                    setFieldValue('anonymous', value);
                  }}
                  value={values.anonymous}
                />
              </View>

              <PlazaButton
                title="Submit Report"
                onPress={handleSubmit}
                style={{ marginTop: Spacing.SPACING_3, width: '90%' }}
                disabled={errors.reason}
              />
            </>
          )}
        </Formik>

        {submitted && <ThankYou />}
      </View>
    </BottomSheetModal>
  );
};

export default ProductReportModal;

const styles = StyleSheet.create({});
