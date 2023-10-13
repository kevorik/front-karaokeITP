import RegisterForm from "./organism/RegisterForm";

export const RegistrationPage: any = () => {
  return (
    <>
      <div style={styles.container}>
        <div style={styles.formContainer}>{<RegisterForm />}</div>
      </div>
    </>
  );
};

export default RegistrationPage;

const styles = {
  container: {
    padding: "30px",
    // background: "#ececec",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  card: {
    width: "40%",
  },
  formContainer: {
    width: "100%",
  },
};
