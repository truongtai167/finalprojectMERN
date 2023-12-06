import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  InputForm,
  MarkdownEditor,
  Select,
  Loading,
} from "../../components";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { validate, getBase64 } from "../../ultils/helpers";
import { toast } from "react-toastify";
import { apiCreatePitch, apiGetBrandByOwner } from "../../apis";
import { showModel } from "../../store/app/appSlice";

const CreatePitches = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  const { current } = useSelector((state) => state.user);
  const [brand, setBrand] = useState(null);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();
  const fetchBrandByOwner = async (uid) => {
    const response = await apiGetBrandByOwner(uid);
    // console.log(response);
    if (response.success) setBrand(response.brandData);
  };
  useEffect(() => {
    fetchBrandByOwner(current._id);
  }, []);
  const handleCreatePitch = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      if (data.category) {
        data.category = categories?.find(
          (el) => el._id === data.category
        )?.title;
        const finalPayload = { ...data, ...payload, owner: current._id };
        console.log({ ...data, ...payload });
        const formData = new FormData();
        for (let i of Object.entries(finalPayload)) {
          formData.append(i[0], i[1]);
        }
        if (finalPayload.thumb) {
          formData.append("thumb", finalPayload.thumb[0]);
        }
        if (finalPayload.images) {
          for (let image of finalPayload.images)
            formData.append("images", image);
        }
        dispatch(showModel({ isShowModel: true, modelChildren: <Loading /> }));
        console.log(formData);

        const response = await apiCreatePitch(formData);
        console.log(formData);
        dispatch(showModel({ isShowModel: false, modelChildren: null }));
        if (response.success) {
          reset();
          setPayload({
            description: "",
          });
          setPreview({
            thumb: null,
            images: [],
          });
          console.log("CHECK NOTIFICATION");
          toast.success("Create Pitch Success !");
        } else {
          toast.error("Fail!!!");
        }
      }
    }
  };
  const [payload, setPayload] = useState({
    description: "",
  });
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const [hover, setHover] = useState(null);
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("File type not correct");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push({ name: file.name, path: base64 });
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  // const handleRemove = (name) => {
  //     const files = [...watch('images')]
  //     reset({
  //         images: files?.filter(el => el.name !== name)
  //     })
  //     if (preview.images?.some(el => el.name === name)) {
  //         setPreview(prev => ({ ...prev, images: prev.images?.filter(el => el.name !== name) }))
  //     }
  // }
  useEffect(() => {
    if (watch("thumb")) handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    handlePreviewImages(watch("images"));
  }, [watch("images")]);

  return (
    <div className="w-full">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
        <span>Create New Pitch</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreatePitch)}>
          <InputForm
            label="Name pitch"
            register={register}
            errors={errors}
            id="name"
            validate={{
              required: "Require",
            }}
            fullWidth
            placeholder="Name of new pitch"
          />
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label="Price pitch"
              register={register}
              errors={errors}
              id="price"
              validate={{
                required: "Require",
              }}
              style="flex-1"
              placeholder="Price of new pitch"
              type="number"
            />
            <InputForm
              label="Address"
              register={register}
              errors={errors}
              id="address"
              validate={{
                required: "Require",
              }}
              style="flex-1"
              placeholder="Address of new pitch"
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <Select
              label="Category"
              options={categories?.map((el) => ({
                code: el._id,
                value: el.title,
              }))}
              register={register}
              id="category"
              validate={{ required: "Require" }}
              style="flex-1"
              errors={errors}
            />
            <InputForm
              label="Brand"
              register={register}
              errors={errors}
              id="brand"
              validate={{}}
              style="flex-1"
              defaultValue={brand?.title}
              readOnly={true}
            />
          </div>
          <MarkdownEditor
            name="description"
            changeValue={changeValue}
            label="Description"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="thumb">
              Upload thumb
            </label>
            <input
              type="file"
              id="thumb"
              {...register("thumb", { required: "Need Select" })}
            />
            {errors["thumb"] && (
              <small className="text-sx text-red-500">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview.thumb && (
            <div className="my-4">
              <img
                src={preview.thumb}
                alt="thumbnail"
                className="w-[200px] object-contain"
              />
            </div>
          )}
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="pitches">
              Upload Image Of Pitch
            </label>
            <input
              type="file"
              id="pitches"
              {...register("images", { required: "Need Select" })}
              multiple
            />
            {errors["images"] && (
              <small className="text-sx text-red-500">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images.length > 0 && (
            <div className="my-4 flex w-full gap-3 flex-wrap">
              {preview.images.map((el) => (
                <div
                  onMouseEnter={() => setHover(el.name)}
                  onMouseLeave={() => setHover(null)}
                  key={el.name}
                  className="w-fit relative"
                >
                  <img
                    src={el.path}
                    alt="thumbnail"
                    className="w-[200px] object-contain"
                  />
                  {/* {hover === el.name &&
                                        <div
                                            onClick={() => handleRemove(el.name)}
                                            className='absolute inset-0 bg-overlay cursor-pointer flex items-center justify-center' >
                                            <IoTrashBin size={24} color='white' />
                                        </div>
                                    } */}
                </div>
              ))}
            </div>
          )}
          <div className="my-8">
            <Button name={"Create new pitch"} type="submit"></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePitches;
