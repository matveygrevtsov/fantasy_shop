interface Props {
  errorMessage: string;
}

export const SavingChangesError: React.FC<Props> = ({ errorMessage }) => {
  return <div>{errorMessage}</div>;
};
