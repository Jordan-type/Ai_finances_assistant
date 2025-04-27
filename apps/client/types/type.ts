export type StepProps = {
    onNext: () => void;
    onBack?: () => void;
    setLoading: (loading: boolean) => void;
  };



export type StepFundProps = {
    onBack: () => void;
  };
  