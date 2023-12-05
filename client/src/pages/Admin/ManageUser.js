import React, { useEffect, useState, useCallback } from "react";
import {
  apiGetUsers,
  apiUpdateUserByAdmin,
  apiDeleteUserByAdmin,
} from "../../apis/user";
import { roles, blockStatus } from "../../ultils/constants";
import moment from "moment";
import {
  InputField,
  Pagination,
  InputForm,
  Select,
  Button,
} from "../../components";
import useDebounce from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import clsx from "clsx";

const ManageUser = () => {
  const [update, setUpdate] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [queries, setQueries] = useState({
    q: "",
  });
  const [params] = useSearchParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    email: "",
    name: "",
    phoneNumber: "",
    role: "",
    isBlocked: "",
  });
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({
      ...params,
      limit: process.env.REACT_APP_PITCH_LIMIT,
    });
    if (response.success) setUsers(response);
  };
  useEffect(() => {
    if (editUser) {
      reset({
        email: editUser.email,
        name: editUser.name,
        phoneNumber: editUser.phoneNumber,
        role: editUser.role,
        isBlocked: editUser.isBlocked,
      });
    }
  }, [editUser]);
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  const queriesDebounce = useDebounce(queries.q, 500);
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) queries.q = queriesDebounce;
    fetchUsers(queries);
  }, [queriesDebounce, params, update]);

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure...",
      text: "Delete User ?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUserByAdmin(userId);
        if (response.success) {
          setEditUser(null);
          render();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
    });
  };
  // useEffect(() => {
  //   if (editUser) {
  //   }
  // }, [editUser, setEditUser]);
  const handleUpdate = async (data) => {
    const response = await apiUpdateUserByAdmin(data, editUser._id);
    if (response.success) {
      setEditUser(null);
      render();
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  console.log(editUser);
  return (
    <div className="w-full p-2">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
        <span>Manage User</span>
      </h1>

      <div className="w-full p-4">
        <div className="flex justify-end py-4">
          <InputField
            nameKey={"q"}
            value={queries.q}
            setValue={setQueries}
            style="w350"
            placeholder="Search by name or email..."
            isHideLabel
          />
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {editUser && <Button name={"Update"} type="submit" />}
          <table className="table-auto mb-6 text-left w-full">
            <thead className="font-bold bg-gray-700 text-[17px] border border-gray-500 text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((el, index) => (
                <tr key={el._id} className="border border-gray-500">
                  <td className="'text-center py-2 px-4">
                    {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                      process.env.REACT_APP_PITCH_LIMIT +
                      index +
                      1}
                  </td>
                  <td className="py-2 px-4">
                    {editUser?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        // defaultValue={editUser?.name}
                        id={"name"}
                        validate={{ required: "Enter name" }}
                      />
                    ) : (
                      <span>{el.name}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editUser?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={editUser?.email}
                        id={"email"}
                        validate={{
                          required: "Enter your email",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        }}
                      />
                    ) : (
                      <span>{el.email}</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editUser?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={editUser?.phoneNumber}
                        id={"phoneNumber"}
                        validate={{
                          required: "Enter phone number",
                          pattern: {
                            value: /^[62|0]+\d{10}/gi,
                            message: "Invalid phoneNumber",
                          },
                        }}
                      />
                    ) : (
                      <span>{el.phoneNumber}</span>
                    )}
                  </td>

                  <td className="py-2 px-4">
                    {editUser?._id === el._id ? (
                      <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"role"}
                        validate={{ required: "Plseae Select" }}
                        options={roles}
                      />
                    ) : (
                      <span>
                        {roles.find((role) => role.code === +el.role)?.value}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {moment(el.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="py-2 px-4">
                    {editUser?._id === el._id ? (
                      <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"isBlocked"}
                        defaultValue={el.isBlocked}
                        validate={{ required: "Please Select" }}
                        options={blockStatus}
                      />
                    ) : (
                      <span>
                        {
                          blockStatus.find(
                            (status) => status.code === +el.isBlocked
                          )?.value
                        }
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editUser?._id === el._id ? (
                      <span
                        onClick={() => setEditUser(null)}
                        className="px-2 text-orange-600 hover:underline cursor-pointer"
                      >
                        Back
                      </span>
                    ) : (
                      <span
                        onClick={() => setEditUser(el)}
                        className="px-2 text-orange-600 hover:underline cursor-pointer"
                      >
                        Edit
                      </span>
                    )}
                    <span
                      onClick={() => handleDeleteUser(el._id)}
                      className="px-2 text-orange-600 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>

      <div className="w-full flex justify-end">
        <Pagination totalCount={users?.counts} />
      </div>
    </div>
  );
};

export default ManageUser;
