"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomInput from "@/utils/components/CustomInput";
import TitleAuth from "@/utils/components/TitleAuth";
import { useForm } from "react-hook-form";
import { validationSchema } from "@/utils/validations/validation";
import { toast } from "react-toastify";
import PasswordInput from "@/utils/components/PasswordInput";

export default function SignupPage() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const passwordValue = watch("password");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();

      if (response.status === 201) {
        // Signup successful
        // You can redirect the user to a dashboard or login page here
        await router.push("/");
        toast.success(jsonData.message);
      } else {
        // Handle Signup error
        toast.error(jsonData.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden d-flex justify-content-center align-items-center">
      <div className="container px-4 py-4 px-md-5 text-center text-lg-start ">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <TitleAuth />
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong" />
            <div id="radius-shape-2" className="position-absolute shadow-5-strong" />
            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                  {/* 2 column grid layout with text inputs for the first and last names */}
                  <div className="row">
                    <div className="col-md-6">
                      <CustomInput label="First name" type="text" id="firstname" placeholder="First name" name="firstname" validationSchema={validationSchema.firstname} register={register} errors={errors.firstname} />
                    </div>
                    <div className="col-md-6">
                      <CustomInput label="Last name" type="text" id="lastname" placeholder="Last name" name="lastname" validationSchema={validationSchema.lastname} register={register} errors={errors.lastname} />
                    </div>
                  </div>
                  {/* Email input */}
                  <CustomInput label="Email address" type="text" id="email" placeholder="Email address" name="email" validationSchema={validationSchema.email} register={register} errors={errors.email} />
                  {/* Password input */}
                  <PasswordInput label="Password" passwordValue={passwordValue} id="password" placeholder="Password" name="password" validationSchema={validationSchema.password} register={register} errors={errors.password} />
                  {/* Login Navigation*/}
                  <div className="d-flex justify-content-center mb-4">
                    <div>
                      Already have an account? <Link href="/login">Login</Link>
                    </div>
                  </div>
                  {/* Submit button */}
                  <button type="submit" className="btn btn-primary btn-block w-100 shadow shadow-md mb-4">
                    Sign up
                  </button>
                  {/* Register buttons */}
                  <div className="text-center">
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link  mx-1">
                      <i className="bi bi-facebook" />
                    </button>
                    <button type="button" className="btn btn-link  mx-1">
                      <i className="bi bi-google" />
                    </button>
                    <button type="button" className="btn btn-link  mx-1">
                      <i className="bi bi-twitter" />
                    </button>
                    <button type="button" className="btn btn-link  mx-1">
                      <i className="bi bi-github" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
