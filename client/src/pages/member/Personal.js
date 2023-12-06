import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, InputForm } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/avatar-default.png";
import moment from "moment";
import { apiUpdateCurrent } from "../../apis";
import { getCurrent } from "../../store/user/asyncAction";
import { toast } from "react-toastify";

const Personal = () => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm();
  const { current } = useSelector((state) => state.user);

  console.log({ current });
  const dispatch = useDispatch();
  useEffect(() => {
    reset({
      name: current?.name,
      email: current?.email,
      phoneNumber: current?.phoneNumber,
      avatar: current?.avatar,
    });
  }, [current]);
  const handleUpdateInfor = async (data) => {
    const formData = new FormData();
    if (data.avatar.length > 0) {
    }
    formData.append("avatar", data.avatar[0]);
    delete data.avatar;
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);

    const response = await apiUpdateCurrent(formData);
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.message);
    } else toast.error(response.message);
  };
  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-semibold py-4 border-b border-b-blue-200">
        Personal
      </header>
      <form
        onSubmit={handleSubmit(handleUpdateInfor)}
        className="w-4/5 mx-auto py-8 flex flex-col gap-4"
      >
        <InputForm
          label="name"
          register={register}
          errors={errors}
          id="name"
          validate={{ required: "Require" }}
        ></InputForm>
        <InputForm
          label="phoneNumber"
          register={register}
          errors={errors}
          id="phoneNumber"
          validate={{
            required: "Enter phone number",
            pattern: {
              value: /^[62|0]+\d{10}/gi,
              message: "Invalid phoneNumber",
            },
          }}
        ></InputForm>
        <InputForm
          label="Email address"
          register={register}
          errors={errors}
          id="email"
          validate={{
            required: "Need fill this field",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Email invalid.",
            },
          }}
        ></InputForm>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Account status:</span>
          <span>{current?.isBlocked ? "Blocked" : "Actived"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Role:</span>
          <span>
            {+current?.role === 20110394
              ? "Admin"
              : +current?.role === 20110396
              ? "PitchOwner"
              : "User"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Created At:</span>
          <span>{moment(current?.createdAt).fromNow()}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Profile image:</span>
          <label htmlFor="file">
            <img
              src={current?.avatar || avatar}
              alt="avatar"
              className="w-20 h-20 ml-8 object-cover rounded-full"
            ></img>
          </label>
          <input type="file" id="file" {...register("avatar")} hidden></input>
        </div>

        {isDirty && (
          <div className="w-full flex justify-end">
            <Button name="Update information" type="submit"></Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Personal;
