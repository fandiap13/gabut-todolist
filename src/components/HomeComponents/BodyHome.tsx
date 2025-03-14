"use client";

import React, { useEffect, useState } from 'react'
import { IoTime } from 'react-icons/io5'
import SummaryCard from './SummaryCard'
import TaksComponent from './TaksComponent'
import LoadingPageComponent from '../LoadingPageComponent'
import { FaPlus } from 'react-icons/fa6';
import Navbar from '../LayoutComponents/Navbar'
import AddTaskModal from '../TaskComponents/AddTaskModal'
import Swal from 'sweetalert2'
import { CountTaskData, deleteTask, fetchListTask, StatusType, TaskList, updateCheckTask } from '@/services/task/task'
import LoadingProcessComponent from '../LoadingProcessComponent';
import { useSession } from 'next-auth/react';

const BodyHome = () => {
    const user_id = useSession().data?.user?.id;

    const [status, setStatus] = useState<StatusType | string>("today");
    const [isClientPage, setIsClientPage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<TaskList[]>([]);
    const [countData, setCountData] = useState<CountTaskData | null>(null);

    useEffect(() => {
        setIsClientPage(true)
    }, []);

    const changeStatus = (title: string) => {
        setStatus(title);
    }

    const listTask = async () => {
        try {
            setIsLoading(true);
            const response = await fetchListTask({
                user_id,
                status: status,
            });
            setCountData(response.countData);
            setData(response.data);
            setIsLoading(false);
        } catch (error: any) {
            console.error("Error get task:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.message || "Failed to add task!",
            });
            setIsLoading(false);
        }
    }

    const [dataDetail, setDataDetail] = useState<TaskList | null>(null);

    const showAddTaskModal = () => {
        const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
        if (modal) {
            modal.showModal(); // Open the modal
        }
    }

    const closeAddTaskModal = () => {
        setDataDetail(null);
        const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
        if (modal) {
            modal.close(); // Open the modal
        }
        listTask();
    }

    const onCheck = async (task: TaskList) => {
        try {
            setIsLoading(true);
            const status = task.status == 1 ? 2 : 1;
            const response = await updateCheckTask(task.task_id, status);
            // Swal.fire({
            //     icon: "success",
            //     title: "Success",
            //     text: response?.message || "Success update task!",
            // });
            listTask();
            setIsLoading(false);
        } catch (error: any) {
            console.error("Error get task:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.message || "Failed to update task!",
            });
            setIsLoading(false);
        }
    }

    const onEdit = (task: TaskList) => {
        setDataDetail(task);
        const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
        if (modal) {
            modal.showModal(); // Open the modal
        }
    }

    const onDelete = (task: TaskList) => {
        Swal.fire({
            title: "Are you sure to delete this task?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setIsLoading(true);
                    const response = await deleteTask(task.task_id);
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response?.message || "Success delete task!",
                    }).then(() => {
                        listTask();
                    });
                    setIsLoading(false);
                } catch (error: any) {
                    console.error("Error get task:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error?.message || "Failed to delete task!",
                    });
                    setIsLoading(false);
                }
            }
        });
    }

    useEffect(() => {
        listTask();
    }, [status]);

    if (!isClientPage) {
        return (
            <LoadingPageComponent />
        )
    }

    return (
        <main className="w-full h-full lg:h-screen lg:max-h-screen bg-gradient-to-bl from-[#1E1F26] to-[#363058] text-white">
            <Navbar />

            <div className="max-w-screen-xl mx-auto px-10 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-6 items-start">
                    <div className="w-full grid grid-cols-2 gap-4">
                        <SummaryCard title="Today" amount={countData?.todayCount || 0} Icon={IoTime} status={status} onClick={changeStatus} />
                        <SummaryCard title="Schedule" amount={countData?.scheduleCount || 0} Icon={IoTime} status={status} onClick={changeStatus} />
                        <SummaryCard title="All" amount={countData?.allCount || 0} Icon={IoTime} status={status} onClick={changeStatus} />
                    </div>

                    <div>
                        <div className='flex items-center justify-between'>
                            <h3 className="text-2xl font-semibold uppercase">{status}'s Tasks</h3>
                            <button className="btn btn-primary" onClick={showAddTaskModal}>
                                <FaPlus className='w-5 h-5 mr-1' /> open modal
                            </button>
                        </div>
                        <div className="mt-8 flex flex-col gap-3 h-auto lg:h-[calc(100vh-250px)] lg:overflow-y-auto">
                            {data.length > 0 ? data.map(d => {
                                // const task_date = d.task_date.split("T")[0]; // Get the date part
                                // const task_time = d.task_time.split("T")[1].split(".")[0];

                                return (
                                    <TaksComponent
                                        key={d.task_id}
                                        data={d}
                                        title={d.title}
                                        date={d.task_date}
                                        time={d.task_time}
                                        isActive={d.status == 2}
                                        onCheck={onCheck}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                )
                            }) : (
                                <div>Yout task is empty Sir...</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <AddTaskModal
                closeAddTaskModal={closeAddTaskModal}
                detail={dataDetail}
            />

            <LoadingProcessComponent loading={isLoading} />
        </main>
    )
}

export default BodyHome