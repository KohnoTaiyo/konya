"use client";

import { useEffect } from "react";

import { Button } from "@/components/Button/Button";

type ModalProps = {
  text: string;
  onApproval?: () => void;
  onCancel?: () => void;
};

export function Modal(props: ModalProps) {
  useEffect(() => {
    const body = document.querySelector("body");
    body?.classList.add("overflow-hidden");
    return () => {
      body?.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed w-screen h-screen z-50 bg-black bg-opacity-50 top-0 left-0 flex items-center justify-center">
      <div className="w-4/5 max-w-sm bg-white rounded-md p-4">
        <p className="mb-4 font-bold">{props.text}</p>
        <div className="flex justify-end gap-2">
          <Button text="キャンセル" onClick={props.onCancel} size="small" color="gray" />
          <Button text="はい" onClick={props.onApproval} size="small" />
        </div>
      </div>
    </div>
  );
}
