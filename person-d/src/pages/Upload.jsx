import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  Clock,
  Image,
  ImagePlus,
  FolderOpen,
  Home,
  Sparkles,
  Upload as UploadIcon,
  UploadCloud,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
export default function Upload() {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileName, setFileName] = useState("No file selected");
  return (
    <div>
      <div className="min-h-[780px] bg-white text-zinc-950 flex flex-col w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <header className="bg-white border-zinc-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-4 pt-10 pb-4 items-center gap-4">
          <button 
          onClick={() => navigate("/")}
          className="size-10 shrink-0 rounded-full text-zinc-950 flex justify-center items-center">
            <ArrowLeft className="size-5" />
          </button>
          <h1 className="font-bold text-center text-zinc-950 text-lg leading-7 pr-10 flex-1">
            Upload Reference Pose
          </h1>
        </header>
        <main className="flex px-4 py-6 flex-col flex-1 gap-6">
          <div className="shadow-sm text-center rounded-3xl bg-[#2b7fff]/5 border-[#2b7fff]/25 border-2 border-dashed flex px-5 py-10 flex-col justify-center items-center gap-4">
            <div className="size-16 rounded-full bg-[#2b7fff]/10 flex justify-center items-center">
              <UploadCloud className="size-8 text-[#2b7fff]" />
            </div>
            <p className="max-w-[220px] font-medium text-[#71717b] text-sm leading-5">
              Select a reference pose image from your gallery
            </p>
           <input
            type="file"
            accept="image/*"
            id="image-upload"
            className="hidden" 
            onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setSelectedImage(URL.createObjectURL(file));
                setFileName(file.name);
                }}
            />       
            <button 
            onClick={() => document.getElementById("image-upload").click()}
            className="inline-flex shadow-sm font-semibold rounded-full bg-white text-[#2b7fff] text-sm leading-5 border-[#2b7fff]/20 border-1 border-solid px-4 py-2 items-center gap-2">
              <FolderOpen className="size-4" />
              Browse Library
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold uppercase text-[#71717b] text-xs leading-4 tracking-[1.92px]">
              Preview
            </span>
            <Card className="shadow-sm rounded-2xl border-zinc-200 border-1 border-solid p-0 gap-0 overflow-hidden">
              <CardContent className="p-0 gap-0">
                <div className="relative aspect-video bg-zinc-100 flex justify-center items-center w-full overflow-hidden">
                  <img
                  src={selectedImage || "https://images.unsplash.com/photo-1529229504105-4ea795dcbf59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHBvc2UlMjBtb3Rpb24lMjBhY3Rpb258ZW58MXwwfHx8MTc4MzE0MzAxOHww&ixlib=rb-4.1.0&q=80&w=400"}
                    alt="Image preview placeholder"
                    className="object-cover opacity-30 w-full h-full"
                    data-photoid="KHipnBn7sdY"
                    data-authorname="Ahmad Odeh"
                    data-authorurl="https://unsplash.com/@aoddeh"
                    data-blurhash="LMAT1SxaNHSO0LWBbHRk~VofWBt6"
                  />
                  {!selectedImage && (
                  <div className="bg-[#2b7fff]/10 flex absolute inset-0 flex-col justify-center items-center gap-2">
                    <div className="size-14 shadow-sm rounded-full bg-white/85 flex justify-center items-center">
                      <ImagePlus className="size-6 text-[#2b7fff]" />
                    </div>
                    <span className="font-medium text-[#71717b] text-xs leading-4">
                      No photo selected
                    </span>
                  </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-zinc-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex p-4 justify-between items-center gap-2">
                <div className="min-w-0 flex items-center gap-2">
                  <Image className="size-4 shrink-0 text-[#71717b]" />
                  <span className="truncate font-medium text-zinc-950 text-sm leading-5">
                    {fileName}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="rounded-full text-[#71717b] px-3 py-1 gap-1"
                >
                  <Clock className="size-3" />
                  JPG
                </Badge>
              </CardFooter>
            </Card>
          </div>
        </main>
        <div className="px-4 pb-4">
          <Button
            disabled={!selectedImage}
            onClick={() => navigate("/camera")}
            className="shadow-sm font-semibold rounded-2xl bg-[#2b7fff] text-blue-50 text-base leading-6 w-full h-14"
          >
            <Sparkles className="size-5" />
            Analyze Pose
          </Button>
        </div>
        <nav className="bg-white border-zinc-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex px-2 pt-3 pb-6 justify-around items-center">
          <button 
          onClick={() => navigate("/")}
          className="text-[#71717b] flex px-3 py-1 flex-col items-center gap-1">
            <Home className="size-5" />
            <span className="font-medium text-[11px]">Home</span>
          </button>
          <button 
          onClick={() => navigate("/upload")}
          className="rounded-xl text-[#2b7fff] flex px-3 py-1 flex-col items-center gap-1">
            <UploadIcon className="size-5" />
            <span className="font-semibold text-[11px]">Upload</span>
          </button>
          <button 
          onClick={() => navigate("/camera")}
          className="text-[#71717b] flex px-3 py-1 flex-col items-center gap-1">
            <Camera className="size-5" />
            <span className="font-medium text-[11px]">Camera</span>
          </button>
          <button 
          onClick={() => navigate("/result")}
          className="text-[#71717b] flex px-3 py-1 flex-col items-center gap-1">
            <CheckCircle className="size-5" />
            <span className="font-medium text-[11px]">Result</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
