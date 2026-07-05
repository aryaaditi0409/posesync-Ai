import { useNavigate } from "react-router-dom";
import {
  Activity,
  Camera,
  CheckCircle,
  Home as HomeIcon,
  Sparkles,
  Upload,
} from "lucide-react";

export default function Home() {
    const navigate = useNavigate();
  return (
    <div>
      <div className="bg-white text-zinc-950 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="relative min-h-[780px] bg-[linear-gradient(180deg,oklch(0.985_0.01_240),oklch(1_0_0))] flex flex-col w-full overflow-hidden">
          <div className="flex px-6 pt-14 pb-6 flex-col items-center flex-1">
            <div className="flex flex-col items-center flex-1 gap-4 w-full">
              <div className="size-16 shadow-lg shadow-primary/25 rounded-2xl bg-[#2b7fff] flex justify-center items-center">
                <Sparkles className="size-8 text-blue-50" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <h1 className="font-bold text-center text-zinc-950 text-3xl leading-9 tracking-tight">
                  PoseSync AI
                </h1>
                <p className="max-w-[280px] text-center text-[#71717b] text-sm leading-5">
                  Analyze your pose with AI in seconds.
                </p>
              </div>
              <div className="max-w-[300px] mt-6 w-full">
                <div className="relative aspect-[3/4] shadow-[0_10px_30px_rgba(15,23,42,0.12)] rounded-3xl bg-white border-zinc-200 border-1 border-solid overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1671211085251-c49156a49621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcG9zZSUyMHNpbGhvdWV0dGUlMjBibHVlfGVufDF8MXx8fDE3ODMxNDMwMjB8MA&ixlib=rb-4.1.0&q=80&w=400"
                    alt="Human figure in a yoga pose"
                    className="object-cover w-full h-full"
                    data-photoid="3k9XZ4Pd9TY"
                    data-authorname="Rachel Faller"
                    data-authorurl="https://unsplash.com/@rachelcfaller"
                    data-blurhash="LeBgS;kDjZoL9FaefiWXR1f5ayay"
                  />
                  <div className="bg-[linear-gradient(180deg,oklch(0.141_0.005_285.823/.08),transparent_35%,oklch(0.623_0.214_259.815/.18))] absolute inset-0" />
                  <div className="shadow-sm backdrop-blur-sm rounded-full bg-[#2b7fff]/90 text-blue-50 flex absolute left-4 top-4 px-3 py-1.5 items-center gap-2">
                    <Activity className="size-3.5" />
                    <span className="font-medium text-xs leading-4">
                      Pose Detection
                    </span>
                  </div>
                </div>
              </div>
              <div className="max-w-[340px] flex mt-8 flex-col gap-4 w-full">
                <button
                onClick={() => navigate("/upload")}
                className="shadow-lg shadow-primary/25 font-semibold rounded-2xl bg-[#2b7fff] text-blue-50 text-base leading-6 flex px-4 justify-center items-center gap-2 w-full h-14"
                >
                  <Upload className="size-5" />
                  Upload Image
                </button>
                <button 
                onClick={() => navigate("/camera")}
                className="bg-transparent font-semibold rounded-2xl text-[#2b7fff] text-base leading-6 border-[#2b7fff] border-2 border-solid flex px-4 justify-center items-center gap-2 w-full h-14">
                  <Camera className="size-5" />
                  Use Camera
                </button>
              </div>
            </div>
          </div>
          <div className="sticky backdrop-blur-sm bg-white/95 border-zinc-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid bottom-0 px-4 pt-3 pb-6 w-full">
            <div className="flex justify-around items-center">
              <button 
              onClick={() => navigate("/")}
              className="rounded-xl text-[#2b7fff] flex px-3 py-1 flex-col items-center gap-1">
                <HomeIcon className="size-5" />
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
    </div>
  );
}
