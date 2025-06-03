import React from "react";

// Components
import Box from "@/shared/ui/Box";
import { GoogleBtn } from "./(ui)/GoogleBtn";

const SignIn = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center overflow-hidden">
      <Box className="!w-fit p-10">
        <Box.Title className="justify-center">
          Sign in
        </Box.Title>
        <Box.Content>
          <GoogleBtn/>
        </Box.Content>
      </Box>
    </div>
  )
}

export default SignIn;