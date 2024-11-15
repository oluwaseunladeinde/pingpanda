"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { PropsWithChildren, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator";

import { Modal } from "@/components/ui/modal";


const EVENT_CATEGORY_VALIDATOR = z.object({
    name: CATEGORY_NAME_VALIDATOR,
    color: z
        .string()
        .min(1, "Color is required")
        .regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
    emoji: z.string().emoji("Invalid emoji").optional(),
});

type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATOR>;

const COLOR_OPTIONS = [
    "#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
    "#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
    "#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
    "#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
    "#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
    "#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
    "#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
    "#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
    "#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
    "#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
];

const EMOJI_OPTIONS = [
    { emoji: "💰", label: "Money (Sale)" },
    { emoji: "👤", label: "User (Sign-up)" },
    { emoji: "🎉", label: "Celebration" },
    { emoji: "📅", label: "Calendar" },
    { emoji: "🚀", label: "Launch" },
    { emoji: "📢", label: "Announcement" },
    { emoji: "🎓", label: "Graduation" },
    { emoji: "🏆", label: "Achievement" },
    { emoji: "💡", label: "Idea" },
    { emoji: "🔔", label: "Notification" },
]

interface CreateEventCategoryModel extends PropsWithChildren {
    containerClassName?: string
}
export const CreateEventCategoryModal = ({ children, containerClassName }: CreateEventCategoryModel) => {

    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const { register, handleSubmit, watch, setValue, formState: { errors }, } = useForm<EventCategoryForm>({
        resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
    });

    const color = watch("color");
    const selectedEmoji = watch("emoji");

    return (
        <>
            <div className={containerClassName} onClick={() => setIsOpen(true)}>
                {children}
            </div>

            <Modal
                className="max-w-xl p-8"
                showModal={isOpen}
                setShowModal={setIsOpen}
            >

            </Modal>

        </>
    )
}