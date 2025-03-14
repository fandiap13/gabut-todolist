import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { fetchListCategory } from "@/services/category/category";
import { addTask, TaskList, updateTask } from "@/services/task/task";
import LoadingProcessComponent from "../LoadingProcessComponent";
import { useSession } from "next-auth/react";

interface AddTaskModalProps {
    closeAddTaskModal: () => void;
    detail?: TaskList | null;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ closeAddTaskModal, detail }) => {
    const { data } = useSession();
    // console.log({ data });
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            task_date: "",
            task_time: "",
            category_id: "",
            status: 1, // 1 = blom acc, 2 = acc
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
            task_date: Yup.string().required("Date is required"),
            task_time: Yup.string().required("Time is required"),
            category_id: Yup
                .string()
                .nullable(),
            // .required("Category is required"),
            status: Yup
                .number()
                .typeError("Status ID must be a number")
                .required("Status is required"),
        }),
        onSubmit: async (values) => {
            console.log({ values })
            console.log("Submitting form with values:", values);
            console.log("Formik errors:", formik.errors);
            console.log("Formik touched:", formik.touched);
            try {
                setIsLoading(true);
                if (detail?.task_id) {
                    const response = await updateTask(detail.task_id, { user_id: data?.user?.id, ...values });
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.message || "Success edit task",
                        target: document.getElementById('my_modal_5'),
                    });
                    handleClose();
                } else {
                    const response = await addTask({ user_id: data?.user?.id, ...values });
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.message || "Success add task",
                        target: document.getElementById('my_modal_5'),
                    });
                    handleClose();
                }
                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false);
                console.error("Error adding task:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error?.message || "Failed to add task!",
                    target: document.getElementById('my_modal_5'),
                });
            }
        },
    });

    const handleClose = () => {
        closeAddTaskModal();
        formik.resetForm();
    }

    const [dataCategories, setDataCategories] = useState<{ category_id: number, name: string }[]>([]);
    const getDataCategories = async () => {
        try {
            const { data } = await fetchListCategory();
            setDataCategories(data);
        } catch (error: any) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.message,
                target: document.getElementById('my_modal_5'),
            });
        }
    }

    useEffect(() => {
        if (detail?.task_id) {
            formik.setValues({
                title: detail.title || "",
                description: detail.description || "",
                task_date: detail.task_date || "",
                task_time: detail.task_time || "",
                category_id: detail.category_id.toString() || "",
                status: detail.status || 1, // Default to 1 if status is not provided
            });
        }
    }, [detail]);

    useEffect(() => {
        getDataCategories();
    }, []);

    return (
        <>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{detail?.task_id ? "Edit Task" : "Add Task"}</h3>
                    <form onSubmit={formik.handleSubmit} className="py-4 w-full">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Title</legend>
                            <input
                                type="text"
                                name="title"
                                className="input w-full"
                                placeholder="Title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.title && formik.errors.title && (
                                <p className="text-red-500 text-sm">{formik.errors.title}</p>
                            )}
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Description</legend>
                            <input
                                type="text"
                                name="description"
                                className="input w-full"
                                placeholder="Description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <p className="text-red-500 text-sm">{formik.errors.description}</p>
                            )}
                        </fieldset>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Date</legend>
                                <input
                                    type="date"
                                    name="task_date"
                                    className="input w-full"
                                    value={formik.values.task_date}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.task_date && formik.errors.task_date && (
                                    <p className="text-red-500 text-sm">{formik.errors.task_date}</p>
                                )}
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Time</legend>
                                <input
                                    type="time"
                                    name="task_time"
                                    className="input w-full"
                                    value={formik.values.task_time}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.task_time && formik.errors.task_time && (
                                    <p className="text-red-500 text-sm">{formik.errors.task_time}</p>
                                )}
                            </fieldset>
                        </div>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Category</legend>
                            <select className="select w-full" name="category_id" value={formik.values.category_id} onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value={""}>--select--</option>
                                {dataCategories.map((c) => (
                                    <option key={c.category_id} value={c.category_id}>{c.name}</option>
                                ))}
                            </select>
                            {formik.touched.category_id && formik.errors.category_id && (
                                <p className="text-red-500 text-sm">{formik.errors.category_id}</p>
                            )}
                        </fieldset>

                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                            <button type="button" className="btn" onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            <LoadingProcessComponent loading={isLoading} />
        </>
    );
};

export default AddTaskModal;
