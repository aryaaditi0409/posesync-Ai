import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  Camera,
  Check,
  CheckCircle,
  CheckCircle2,
  Download,
  Home,
  RotateCcw,
  ScanLine,
  Upload,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Result() { 
    const navigate = useNavigate();
    const saveImage = () => {
        const link = document.createElement("a");
        link.href = imageSrc;
        link.download = "posesync-image.jpg";
        link.click();
    };
  return (
    <div>
      <div className="bg-white text-zinc-950 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="relative bg-white text-zinc-950 flex mx-auto flex-col w-90 h-195 ">
          <header className="border-zinc-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-4 pt-5 pb-4 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="size-10 shrink-0 text-zinc-950" 
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="size-5" />
            </Button>
            <h1 className="font-semibold text-center text-zinc-950 text-lg leading-7 pr-10 flex-1">
              Pose Analysis Result
            </h1>
          </header>
          <div className="overflow-y-auto flex px-4 pt-5 pb-24 flex-col flex-1 gap-5">
            <div className="relative rounded-2xl bg-zinc-100 w-full h-22 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1599447292180-45fd84092ef0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcG9zZSUyMGZpdG5lc3MlMjBwZXJzb24lMjBzdGFuZGluZyUyMGZ1bGwlMjBib2R5fGVufDF8MXx8fDE3ODMxNDMwMjB8MA&ixlib=rb-4.1.0&q=80&w=400"
                alt="Analyzed pose"
                className="object-cover w-full h-full"
                data-photoid="kh9XApwKtm0"
                data-authorname="Alex Shaw"
                data-authorurl="https://unsplash.com/@matt909"
                data-blurhash="L7CZ|#?vpKXSUHxuRPt8#UM{Mct7"
              />
              <div className="bg-[linear-gradient(to_top,oklch(0.141_0.005_285.823/.28),transparent_60%)] absolute inset-0" />
              <Badge className="bg-[#2b7fff] text-blue-50 absolute left-3 top-3 px-2.5 py-1 gap-1">
                <ScanLine className="size-3.5" />
                Analyzed
              </Badge>
            </div>
            <Card className="shadow-sm rounded-3xl p-6">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="relative w-36 h-36 flex justify-center items-center mb-4">
                  <svg
                    className="size-full -rotate-90 absolute inset-0"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="oklch(0.967 0.001 286.375)"
                      strokeWidth="9"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="oklch(0.623 0.214 259.815)"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeDasharray="263.9"
                      strokeDashoffset="34.3"
                    />
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-zinc-950 text-4xl leading-10">
                      87%
                    </span>
                    <span className="font-medium text-[#71717b] text-sm leading-5">
                      Pose Score
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-zinc-950 text-base leading-6 px-1">
                Feedback
              </h2>
              <Card className="shadow-sm rounded-3xl p-4 gap-4">
                <CardContent className="flex p-0 flex-col gap-0">
                  <div className="flex py-1 items-center gap-4">
                    <div className="size-9 shrink-0 rounded-full bg-[#2b7fff]/10 flex justify-center items-center">
                      <CheckCircle2 className="size-5 text-[#2b7fff]" />
                    </div>
                    <p className="text-zinc-950 text-sm leading-5 flex-1">
                      Shoulders aligned
                    </p>
                    <Check className="size-4 text-[#2b7fff]" />
                  </div>
                  <Separator className="my-4" />
                  <div className="flex py-1 items-center gap-4">
                    <div className="size-9 shrink-0 rounded-full bg-[#e7000b]/10 flex justify-center items-center">
                      <AlertTriangle className="size-5 text-[#e7000b]" />
                    </div>
                    <p className="text-zinc-950 text-sm leading-5 flex-1">
                      Knee angle needs adjustment
                    </p>
                    <X className="size-4 text-[#e7000b]" />
                  </div>
                  <Separator className="my-4" />
                  <div className="flex py-1 items-center gap-4">
                    <div className="size-9 shrink-0 rounded-full bg-[#2b7fff]/10 flex justify-center items-center">
                      <CheckCircle2 className="size-5 text-[#2b7fff]" />
                    </div>
                    <p className="text-zinc-950 text-sm leading-5 flex-1">
                      Great hip posture
                    </p>
                    <Check className="size-4 text-[#2b7fff]" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex pt-2 flex-col gap-2">
              <Button 
              onClick={() => navigate("/camera")}
              className="bg-[#2b7fff] text-blue-50 gap-2 w-full">
                <RotateCcw className="size-4" />
                Try Again
              </Button>
              <Button 
              variant="outline" 
              className="gap-2 w-full"
                onClick={saveImage}>
                <Download className="size-4" />
                <Button onClick={saveImage}>
                Save Image
                </Button>
              </Button>
            </div>
          </div>
          <nav className="bg-white border-zinc-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex absolute inset-x-0 bottom-0 p-2 justify-around items-center">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-[#71717b] flex px-3 py-2 flex-col items-center gap-1 h-auto"
            >
              <Home className="size-5" />
              <span className="text-xs leading-4">Home</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/upload")}
              className="text-[#71717b] flex px-3 py-2 flex-col items-center gap-1 h-auto"
            >
              <Upload className="size-5" />
              <span className="text-xs leading-4">Upload</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/camera")}
              className="text-[#71717b] flex px-3 py-2 flex-col items-center gap-1 h-auto"
            >
              <Camera className="size-5" />
              <span className="text-xs leading-4">Camera</span>
            </Button>
            <Button
              variant="ghost"
              className="text-[#2b7fff] flex px-3 py-2 flex-col items-center gap-1 h-auto"
            >
              <CheckCircle className="size-5" />
              <span className="font-medium text-xs leading-4">Result</span>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
