import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Repeat2, Camera as CameraIcon, CheckCircle, Home, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CameraPage() {
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [facingMode, setFacingMode] = useState("user");
    const captureImage = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setCapturedImage(imageSrc);
        }
    };
    const flipCamera = () => {
        setFacingMode((prev) =>
            prev === "user" ? "environment" : "user"
        );
    };
  return (
    <div>
      <div className="bg-zinc-950 text-neutral-50 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="relative bg-[linear-gradient(to_bottom,oklch(0.18_0.08_225),oklch(0.14_0.005_285.823)_42%,oklch(0.12_0.01_285.823)_100%)] w-full h-195 overflow-hidden">
          {capturedImage ? (
            <img
            src={capturedImage}
            alt="Captured"
            className="object-cover opacity-85 absolute inset-0 w-full h-full"
            />
         ) : (
         <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode,
        }}
        className="object-cover opacity-85 absolute inset-0 w-full h-full"
        />)}
          <div className="bg-[linear-gradient(to_bottom,oklch(0.18_0.08_225/.92),transparent_18%,transparent_62%,oklch(0.14_0.005_285.823/.92)_100%)] absolute inset-0" />
          <div className="bg-[radial-gradient(circle_at_center,transparent_0%,transparent_38%,oklch(0.14_0.005_285.823/.18)_72%,oklch(0.14_0.005_285.823/.45)_100%)] absolute inset-0" />
          <div className="bg-[linear-gradient(to_bottom,oklch(0.18_0.08_225/.95),transparent)] absolute inset-x-0 top-0 h-28" />
          <div className="bg-[linear-gradient(to_top,oklch(0.12_0.01_285.823/.96),transparent)] absolute inset-x-0 bottom-0 h-40" />
          <div className="flex absolute inset-x-0 top-0 px-4 pt-6 justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-white/65 text-xs leading-4">
                PoseSync AI
              </span>
              <h1 className="font-bold text-white text-[28px] leading-8">
                Live Pose Detection
              </h1>
            </div>
            <Badge className="bg-[oklch(0.274_0.006_286.033/.72)] shadow-[0_8px_24px_oklch(0_0_0/.18)] backdrop-blur-sm rounded-full text-white border-white/10 border-1 border-solid px-3 py-1.5 gap-2">
              <span className="relative size-2 flex">
                <span className="inline-flex animate-ping opacity-75 rounded-full bg-[#155dfc] absolute w-full h-full" />
                <span className="relative inline-flex size-2 rounded-full bg-[#155dfc]" />
              </span>
              <span className="font-semibold text-xs leading-4">AI Active</span>
            </Badge>
          </div>
          <div className="flex absolute inset-0 justify-center items-center">
            <svg
              viewBox="0 0 200 320"
              className="drop-shadow-[0_0_12px_oklch(0.488_0.243_264.376/.55)] w-55 h-90"
            >
              <line
                x1="100"
                y1="40"
                x2="100"
                y2="120"
                stroke="oklch(0.488 0.243 264.376)"
                strokeWidth="3"
              />
              <line
                x1="100"
                y1="70"
                x2="55"
                y2="120"
                stroke="oklch(0.488 0.243 264.376)"
                strokeWidth="3"
              />
              <line
                x1="100"
                y1="70"
                x2="145"
                y2="120"
                stroke="oklch(0.488 0.243 264.376)"
                strokeWidth="3"
              />
              <line
                x1="55"
                y1="120"
                x2="45"
                y2="175"
                stroke="oklch(0.488 0.243 264.376)"
                strokeWidth="3"
              />
              <line
                x1="145"
                y1="120"
                x2="155"
                y2="175"
                stroke="oklch(0.488 0.243 264.376)"
                strokeWidth="3"
              />
              <line
                x1="100"
                y1="120"
                x2="78"
                y2="180"
                stroke="oklch(0.488 0.243 264.376)"
                strokeWidth="3"
              />
              <line
                x1="100"
                y1="120"
                x2="122"
                y2="180"
                stroke="oklch(0.488 0.243 264.376)"
                strokeWidth="3"
              />
              <line
                x1="78"
                y1="180"
                x2="72"
                y2="250"
                stroke="oklch(0.488 0.243 264.376)"
                strokeWidth="3"
              />
              <line
                x1="122"
                y1="180"
                x2="128"
                y2="250"
                stroke="oklch(0.488 0.243 264.376)"
                strokeWidth="3"
              />
              <line
                x1="72"
                y1="250"
                x2="68"
                y2="300"
                stroke="oklch(0.488 0.243 264.376)"
                strokeWidth="3"
              />
              <line
                x1="128"
                y1="250"
                x2="132"
                y2="300"
                stroke="oklch(0.488 0.243 264.376)"
                strokeWidth="3"
              />
              <circle
                cx="100"
                cy="32"
                r="9"
                fill="oklch(0.546 0.245 262.881)"
              />
              <circle cx="100" cy="70" r="5" fill="oklch(0.696 0.17 162.48)" />
              <circle cx="55" cy="120" r="5" fill="oklch(0.696 0.17 162.48)" />
              <circle cx="145" cy="120" r="5" fill="oklch(0.696 0.17 162.48)" />
              <circle cx="45" cy="175" r="5" fill="oklch(0.696 0.17 162.48)" />
              <circle cx="155" cy="175" r="5" fill="oklch(0.696 0.17 162.48)" />
              <circle cx="100" cy="120" r="5" fill="oklch(0.696 0.17 162.48)" />
              <circle cx="78" cy="180" r="5" fill="oklch(0.696 0.17 162.48)" />
              <circle cx="122" cy="180" r="5" fill="oklch(0.696 0.17 162.48)" />
              <circle cx="72" cy="250" r="5" fill="oklch(0.696 0.17 162.48)" />
              <circle cx="128" cy="250" r="5" fill="oklch(0.696 0.17 162.48)" />
              <circle cx="68" cy="300" r="5" fill="oklch(0.696 0.17 162.48)" />
              <circle cx="132" cy="300" r="5" fill="oklch(0.696 0.17 162.48)" />
            </svg>
          </div>
          <div className="flex absolute inset-x-0 bottom-24 px-4 justify-between items-center">
            <button 
            onClick={() => navigate("/upload")}
            className="size-14 bg-[oklch(0.274_0.006_286.033/.55)] shadow-[0_10px_24px_oklch(0_0_0/.22)] backdrop-blur-sm rounded-2xl border-white/35 border-1 border-solid flex justify-center items-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618838149959-cb811a73dbab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwcG9ydHJhaXQlMjBkYXJrfGVufDF8Mnx8fDE3ODMxNDMwMjB8MA&ixlib=rb-4.1.0&q=80&w=400"
                alt="Gallery thumbnail"
                className="object-cover w-full h-full"
                data-photoid="YPwOA_jUjxE"
                data-authorname="Nando García"
                data-authorurl="https://unsplash.com/@masklim"
                data-blurhash="L12$He%M4nD%Rjj[t7Rj9FM{xuof"
              />
            </button>
            <button 
            onClick={captureImage} 
            className="size-20 shadow-[0_0_28px_oklch(0.488_0.243_264.376/.7)] rounded-full bg-[#155dfc] border-white border-4 border-solid flex justify-center items-center">
              <span className="size-14 rounded-full bg-[#155dfc] border-white/40 border-2 border-solid" />
            </button>
            <button 
            onClick={flipCamera}
            className="size-14 backdrop-blur-sm rounded-full bg-white/15 text-white border-white/20 border-1 border-solid flex justify-center items-center"
            >
              <Repeat2 className="size-6" />
            </button>
          </div>
          <div className="bg-[linear-gradient(to_top,oklch(0.18_0.08_225/.96),oklch(0.14_0.005_285.823/.92)_70%,transparent)] backdrop-blur-sm border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid absolute inset-x-0 bottom-0">
            <nav className="flex px-4 pt-3 pb-6 justify-around items-center">
              <button 
              onClick={() => navigate("/")}
              className="text-white/60 flex flex-col items-center gap-1">
                <Home className="size-5" />
                <span className="font-medium text-[11px]">Home</span>
              </button>
              <button 
              onClick={() => navigate("/upload")}
              className="text-white/60 flex flex-col items-center gap-1">
                <Upload className="size-5" />
                <span className="font-medium text-[11px]">Upload</span>
              </button>
              <button 
              onClick={() => navigate("/camera")}
              className="rounded-lg text-[#155dfc] flex px-3 py-1 flex-col items-center gap-1">
                <CameraIcon className="size-5" />
                <span className="font-semibold text-[11px]">Camera</span>
              </button>
              <button 
              onClick={() => navigate("/result")}
              className="text-white/60 flex flex-col items-center gap-1">
                <CheckCircle className="size-5" />
                <span className="font-medium text-[11px]">Result</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
