import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Camera,
  CheckCircle,
  Home,
  RefreshCw,
  Sparkles,
  Upload,
  WifiOff,
  XCircle,
} from "lucide-react";

export default function ErrorPage() {
    const navigate = useNavigate();
  return (
    <div>
      <div className="bg-white text-zinc-950 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="relative min-h-[780px] bg-[linear-gradient(180deg,oklch(0.97_0.02_259.8),oklch(1_0_0))] flex flex-col w-full overflow-hidden">
          <div className="flex px-4 pt-12 pb-4 flex-col flex-1">
            <div className="flex flex-col items-center gap-4">
              <div className="size-16 shadow-lg shadow-primary/30 rounded-2xl bg-[#2b7fff] flex justify-center items-center">
                <Sparkles className="size-8 text-blue-50" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="font-bold text-zinc-950 text-3xl leading-9 tracking-tight">
                  PoseSync AI
                </h1>
                <p className="max-w-[280px] text-center text-[#71717b] text-sm leading-5">
                  Analyze your pose with AI in seconds.
                </p>
              </div>
            </div>
            <div className="flex pt-8 justify-center items-center flex-1">
              <div className="relative max-w-[320px] bg-[linear-gradient(180deg,oklch(0.623_0.214_259.815/.08),oklch(0.97_0.02_259.8/.55))] shadow-[0_18px_40px_oklch(0.623_0.214_259.815/.12)] rounded-3xl border-zinc-200 border-1 border-solid p-6 w-full overflow-hidden">
                <div className="bg-[radial-gradient(circle_at_top,oklch(0.623_0.214_259.815/.12),transparent_42%),linear-gradient(180deg,transparent,oklch(0.623_0.214_259.815/.08))] absolute inset-0" />
                <div className="relative flex flex-col gap-5">
                  <div className="inline-flex shadow-sm shadow-primary/20 rounded-full bg-[#2b7fff] text-blue-50 px-3 py-1.5 items-center gap-2 w-fit">
                    <AlertTriangle className="size-3.5" />
                    <span className="font-medium text-xs leading-4">
                      Upload failed
                    </span>
                  </div>
                  <div className="flex pt-2 flex-col items-center gap-5">
                    <div className="size-28 shadow-[0_0_0_12px_oklch(0.623_0.214_259.815/.08)] rounded-full bg-white/70 flex justify-center items-center">
                      <WifiOff className="size-12 text-[#2b7fff]" />
                    </div>
                    <div className="text-center flex flex-col items-center gap-2">
                      <h2 className="font-semibold text-zinc-950 text-2xl leading-8 tracking-tight">
                        Connection lost
                      </h2>
                      <p className="max-w-[250px] text-[#71717b] text-sm leading-5">
                        Your image could not be analyzed right now. Please check
                        your connection and try uploading again.
                      </p>
                    </div>
                    <div className="shadow-sm rounded-2xl bg-white/80 border-zinc-200 border-1 border-solid p-4 w-full">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-[#e7000b]/10 text-[#e7000b] mt-0.5 p-2">
                          <XCircle className="size-4" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="font-medium text-zinc-950 text-sm leading-5">
                            Analysis interrupted
                          </p>
                          <p className="text-[#71717b] text-xs leading-4">
                            The pose detection service was unable to process the
                            image.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex px-4 pb-4 flex-col gap-4">
              <button 
              onClick={() => navigate("/upload")}
              className="shadow-lg shadow-primary/30 font-semibold rounded-2xl bg-[#2b7fff] text-blue-50 text-base leading-6 flex px-4 justify-center items-center gap-2 w-full h-14">
                <RefreshCw className="size-5" />
                Try Again
              </button>
              <button 
              onClick={() => navigate("/")}
              className="bg-transparent font-semibold rounded-2xl text-[#2b7fff] text-base leading-6 border-[#2b7fff] border-2 border-solid flex px-4 justify-center items-center gap-2 w-full h-14">
                <Home className="size-5" />
                Go Back Home
              </button>
            </div>
          </div>
          <div className="sticky bg-white border-zinc-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex bottom-0 px-4 pt-3 pb-6 justify-around items-center w-full">
            <button className="rounded-xl text-[#2b7fff] flex px-3 py-1 flex-col items-center gap-1">
              <Home className="size-5" />
              <span className="font-medium text-xs leading-4">Home</span>
            </button>
            <button 
            onClick={() => navigate("/upload")}
            className="rounded-xl text-[#71717b] flex px-3 py-1 flex-col items-center gap-1">
              <Upload className="size-5" />
              <span className="font-medium text-xs leading-4">Upload</span>
            </button>
            <button 
             onClick={() => navigate("/camera")} 
             className="rounded-xl text-[#71717b] flex px-3 py-1 flex-col items-center gap-1">
              <Camera className="size-5" />
              <span className="font-medium text-xs leading-4">Camera</span>
            </button>
            <button 
            onClick={() => navigate("/result")}
            className="rounded-xl text-[#71717b] flex px-3 py-1 flex-col items-center gap-1">
              <CheckCircle className="size-5" />
              <span className="font-medium text-xs leading-4">Result</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
