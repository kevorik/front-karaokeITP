import { useParams } from "react-router-dom";
import { useFetchOneUserQuery } from "../users.store";
import { UserCards } from "../organisms/UsersCards";
import { UsersForm } from "../organisms";

export const UpdateUsers: any = () => {
  const { id } = useParams();

  const { data: user, isSuccess, isError } = useFetchOneUserQuery(id);

  return (
    <>
      <div style={styles.container}>
        <div style={styles.card}>
          {(isSuccess || isError) && <UserCards user={user} id={id} />}
        </div>
        <div style={styles.formContainer}>
          {isSuccess && <UsersForm user={user} isSuccess={isSuccess} id={id} />}
          {isError && <UsersForm user={null} isSuccess={isError} id={id} />}
        </div>
      </div>
    </>
  );
};

export default UpdateUsers;

const styles = {
  container: {
    padding: "30px",
    background: "#ececec",
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
