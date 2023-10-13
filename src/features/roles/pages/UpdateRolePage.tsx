import { useParams } from "react-router-dom";
import RoleForm from "../organisms/RoleForm";
import { useFetchOneRoleQuery } from "../roles.store";

export const UpdateRole: any = () => {
  const { id } = useParams();

  const { data: role, isSuccess, isError } = useFetchOneRoleQuery(id);

  return (
    <>
      <div style={styles.container}>
        <div style={styles.formContainer}>
          {isSuccess && <RoleForm role={role} isSuccess={isSuccess} id={id} />}
          {isError && <RoleForm role={null} isSuccess={isError} id={id} />}
        </div>
      </div>
    </>
  );
};

export default UpdateRole;

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
