import { Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";

export const UserUpdateComponent = () => {
  return (
    <>
      <h1>Tao moi nguoi dung ! chinhr sua nguoi dung</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
          <Button variant="contained" onClick={() => (console.log("Fuck"))}>
            Xac nhan
          </Button>
        </FormControl>
      </div>
    </>
  );
};
