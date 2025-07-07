import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card
        color="transparent"
        shadow={false}
        className="p-8 bg-white rounded-xl shadow-md w-full max-w-md"
      >
        <Typography variant="h4" color="blue-gray" className="text-center">
          Sign Up
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal text-center text-sm"
        >
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-full">
          <div className="mb-4 flex flex-col gap-4">
            <div>
              <Typography variant="h6" color="blue-gray" className="-mb-1">
                Your Name
              </Typography>
              <Input
                size="lg"
                placeholder="John Doe"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="-mb-1">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray" className="-mb-1">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>

          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree to the
                <a
                  href="#"
                  className="font-medium text-blue-500 hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5 mt-2" }}
          />

          <Button className="mt-6" fullWidth>
            Sign Up
          </Button>

          <Typography
            color="gray"
            className="mt-4 text-center font-normal text-sm"
          >
            Already have an account?{" "}
            <a href="#" className="font-medium text-blue-500 hover:underline">
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default Signup;
