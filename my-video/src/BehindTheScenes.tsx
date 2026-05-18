import { AbsoluteFill, interpolate, useCurrentFrame, Img, staticFile } from "remotion";

const SLIDE_DURATION = 90;
const TRANSITION = 20;

type Slide = {
  objectPosition: string;
  zoomFrom: number;
  zoomTo: number;
};

const SLIDES: Slide[] = [
  { objectPosition: "25% 17%", zoomFrom: 1.0, zoomTo: 1.1 },
  { objectPosition: "75% 17%", zoomFrom: 1.1, zoomTo: 1.0 },
  { objectPosition: "25% 50%", zoomFrom: 1.0, zoomTo: 1.1 },
  { objectPosition: "75% 50%", zoomFrom: 1.1, zoomTo: 1.0 },
  { objectPosition: "25% 83%", zoomFrom: 1.0, zoomTo: 1.1 },
  { objectPosition: "75% 83%", zoomFrom: 1.1, zoomTo: 1.0 },
];

export const BehindTheScenes: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {SLIDES.map((slide, i) => {
        const start = i * SLIDE_DURATION;
        const fadeInEnd = start + TRANSITION;
        const fadeOutStart = start + SLIDE_DURATION;
        const fadeOutEnd = start + SLIDE_DURATION + TRANSITION;

        const opacity = interpolate(
          frame,
          [start, fadeInEnd, fadeOutStart, fadeOutEnd],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const localFrame = Math.max(0, frame - start);
        const scale = interpolate(
          localFrame,
          [0, SLIDE_DURATION + TRANSITION],
          [slide.zoomFrom, slide.zoomTo],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <AbsoluteFill key={i} style={{ opacity }}>
            <Img
              src={staticFile("wedding.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: slide.objectPosition,
                transform: `scale(${scale})`,
                transformOrigin: "center",
              }}
            />
          </AbsoluteFill>
        );
      })}

      {/* Bottom gradient */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 45%)",
          pointerEvents: "none",
        }}
      />

      {/* Text overlay */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: 72,
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 18,
            fontFamily: "sans-serif",
            letterSpacing: 8,
            textTransform: "uppercase",
            margin: 0,
            opacity: interpolate(frame, [10, 45], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [10, 45], [16, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          Photography
        </p>
        <h1
          style={{
            color: "#ffffff",
            fontSize: 72,
            fontFamily: "Georgia, serif",
            letterSpacing: 5,
            margin: "10px 0 0",
            fontWeight: 400,
            opacity: interpolate(frame, [25, 60], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [25, 60], [16, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          Behind the Scenes
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const BEHIND_THE_SCENES_DURATION = SLIDES.length * SLIDE_DURATION + TRANSITION;
