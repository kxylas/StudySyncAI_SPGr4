import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2, File, Image, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface FileUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: number;
  onUploadSuccess: (file: any) => void;
}

export default function FileUploadDialog({
  isOpen,
  onClose,
  chatId,
  onUploadSuccess,
}: FileUploadDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when dialog is closed
  const handleClose = () => {
    setSelectedFile(null);
    setIsUploading(false);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("chatId", chatId.toString());

      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      
      toast({
        title: "File uploaded successfully",
        description: `${selectedFile.name} has been uploaded`,
        variant: "default",
      });

      onUploadSuccess(data.file);
      handleClose();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = () => {
    if (!selectedFile) return null;
    
    if (selectedFile.type.startsWith("image/")) {
      return <Image className="h-10 w-10 text-[#003366]" />;
    }
    
    return <File className="h-10 w-10 text-[#003366]" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#222222] text-white border-[#003366]">
        <DialogHeader>
          <DialogTitle className="text-[#F5A623]">Upload File</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Share documents or images in this conversation.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${selectedFile ? 'border-[#F5A623] bg-[#F5A62315]' : 'border-neutral-600 hover:border-[#F5A623]'}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.txt,.md"
            />
            
            {selectedFile ? (
              <div className="flex flex-col items-center gap-2">
                {getFileIcon()}
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-neutral-200">{selectedFile.name}</span>
                </div>
                <span className="text-xs text-neutral-400">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-[#00336615] flex items-center justify-center">
                  <File className="h-5 w-5 text-[#F5A623]" />
                </div>
                <span className="text-sm font-medium text-neutral-300">
                  Click to select a file
                </span>
                <span className="text-xs text-neutral-400">
                  Supported formats: Images, PDF, Word, Text
                </span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleClose}
            className="bg-transparent border-neutral-600 text-neutral-300 hover:bg-[#00336615] hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="bg-[#003366] text-white hover:bg-[#003366]/90 transition-colors"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}