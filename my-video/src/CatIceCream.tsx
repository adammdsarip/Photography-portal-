import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

const LICK_CYCLE = 18;

const CatFace: React.FC<{ frame: number }> = ({ frame }) => {
  const lickPhase = frame % LICK_CYCLE;
  const tongueOut = lickPhase < LICK_CYCLE / 2;

  const eyeBlink = frame % 60 < 5;

  const headBob = Math.sin((frame / LICK_CYCLE) * Math.PI * 2) * 6;

  return (
    <div
      style={{
        position: "relative",
        width: 320,
        height: 320,
        transform: `translateY(${headBob}px)`,
      }}
    >
      {/* Head */}
      <div
        style={{
          position: "absolute",
          width: 280,
          height: 260,
          backgroundColor: "#f4a843",
          borderRadius: "50% 50% 45% 45%",
          top: 40,
          left: 20,
          boxShadow: "inset -10px -10px 20px rgba(0,0,0,0.15)",
        }}
      />

      {/* Left ear */}
      <div
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          borderLeft: "45px solid transparent",
          borderRight: "45px solid transparent",
          borderBottom: "80px solid #f4a843",
          top: 0,
          left: 15,
          transform: "rotate(-15deg)",
        }}
      />
      {/* Left ear inner */}
      <div
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          borderLeft: "28px solid transparent",
          borderRight: "28px solid transparent",
          borderBottom: "52px solid #f8c8a0",
          top: 18,
          left: 32,
          transform: "rotate(-15deg)",
        }}
      />

      {/* Right ear */}
      <div
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          borderLeft: "45px solid transparent",
          borderRight: "45px solid transparent",
          borderBottom: "80px solid #f4a843",
          top: 0,
          right: 15,
          transform: "rotate(15deg)",
        }}
      />
      {/* Right ear inner */}
      <div
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          borderLeft: "28px solid transparent",
          borderRight: "28px solid transparent",
          borderBottom: "52px solid #f8c8a0",
          top: 18,
          right: 32,
          transform: "rotate(15deg)",
        }}
      />

      {/* Eyes */}
      {/* Left eye */}
      <div
        style={{
          position: "absolute",
          width: 50,
          height: eyeBlink ? 6 : 50,
          backgroundColor: "#2d6e2d",
          borderRadius: eyeBlink ? "50%" : "50%",
          top: eyeBlink ? 128 : 105,
          left: 65,
          transition: "height 0.05s",
          overflow: "hidden",
        }}
      >
        {!eyeBlink && (
          <div
            style={{
              position: "absolute",
              width: 22,
              height: 30,
              backgroundColor: "#111",
              borderRadius: "50%",
              top: 8,
              left: 14,
            }}
          />
        )}
        {!eyeBlink && (
          <div
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              backgroundColor: "#fff",
              borderRadius: "50%",
              top: 10,
              left: 24,
            }}
          />
        )}
      </div>

      {/* Right eye */}
      <div
        style={{
          position: "absolute",
          width: 50,
          height: eyeBlink ? 6 : 50,
          backgroundColor: "#2d6e2d",
          borderRadius: "50%",
          top: eyeBlink ? 128 : 105,
          right: 65,
          overflow: "hidden",
        }}
      >
        {!eyeBlink && (
          <div
            style={{
              position: "absolute",
              width: 22,
              height: 30,
              backgroundColor: "#111",
              borderRadius: "50%",
              top: 8,
              left: 14,
            }}
          />
        )}
        {!eyeBlink && (
          <div
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              backgroundColor: "#fff",
              borderRadius: "50%",
              top: 10,
              left: 24,
            }}
          />
        )}
      </div>

      {/* Nose */}
      <div
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          borderLeft: "14px solid transparent",
          borderRight: "14px solid transparent",
          borderTop: "12px solid #e88ca0",
          top: 170,
          left: 147,
        }}
      />

      {/* Mouth lines */}
      <div
        style={{
          position: "absolute",
          width: 30,
          height: 20,
          borderBottom: "3px solid #c47a3a",
          borderRight: "3px solid #c47a3a",
          borderRadius: "0 0 60% 0",
          top: 178,
          left: 118,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 30,
          height: 20,
          borderBottom: "3px solid #c47a3a",
          borderLeft: "3px solid #c47a3a",
          borderRadius: "0 0 0 60%",
          top: 178,
          right: 118,
        }}
      />

      {/* Tongue */}
      {tongueOut && (
        <div
          style={{
            position: "absolute",
            width: 36,
            height: 30,
            backgroundColor: "#f06090",
            borderRadius: "0 0 50% 50%",
            top: 192,
            left: 142,
            opacity: interpolate(lickPhase, [0, 4, LICK_CYCLE / 2 - 2, LICK_CYCLE / 2], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(lickPhase, [0, 4], [0, 8], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        />
      )}

      {/* Whiskers left */}
      {[-15, 0, 15].map((angle, i) => (
        <div
          key={`wl${i}`}
          style={{
            position: "absolute",
            width: 90,
            height: 2,
            backgroundColor: "#c47a3a",
            top: 176 + i * 14,
            left: -55,
            transformOrigin: "right center",
            transform: `rotate(${angle}deg)`,
            borderRadius: 2,
          }}
        />
      ))}

      {/* Whiskers right */}
      {[-15, 0, 15].map((angle, i) => (
        <div
          key={`wr${i}`}
          style={{
            position: "absolute",
            width: 90,
            height: 2,
            backgroundColor: "#c47a3a",
            top: 176 + i * 14,
            right: -55,
            transformOrigin: "left center",
            transform: `rotate(${-angle}deg)`,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
};

const IceCreamCone: React.FC<{ frame: number }> = ({ frame }) => {
  const meltDrip = interpolate(frame, [0, 540], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", width: 140, height: 300 }}>
      {/* Strawberry scoop */}
      <div
        style={{
          position: "absolute",
          width: 120,
          height: 120,
          backgroundColor: "#f4a0b0",
          borderRadius: "50%",
          top: 0,
          left: 10,
          boxShadow: "inset -8px -8px 16px rgba(0,0,0,0.1)",
        }}
      />

      {/* Vanilla scoop */}
      <div
        style={{
          position: "absolute",
          width: 130,
          height: 130,
          backgroundColor: "#fdf0c8",
          borderRadius: "50%",
          top: 65,
          left: 5,
          boxShadow: "inset -8px -8px 16px rgba(0,0,0,0.1)",
        }}
      />

      {/* Chocolate scoop */}
      <div
        style={{
          position: "absolute",
          width: 120,
          height: 120,
          backgroundColor: "#7b3f20",
          borderRadius: "50% 50% 45% 45%",
          top: 130,
          left: 10,
          boxShadow: "inset -8px -8px 16px rgba(0,0,0,0.15)",
        }}
      />

      {/* Melt drip */}
      <div
        style={{
          position: "absolute",
          width: 16,
          height: 20 + meltDrip,
          backgroundColor: "#fdf0c8",
          borderRadius: "0 0 50% 50%",
          top: 140,
          left: 62,
        }}
      />

      {/* Cone */}
      <div
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          borderLeft: "65px solid transparent",
          borderRight: "65px solid transparent",
          borderTop: "130px solid #d4882a",
          top: 185,
          left: 5,
        }}
      />

      {/* Cone grid lines */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 100 - i * 22,
            height: 2,
            backgroundColor: "#b8721f",
            top: 205 + i * 28,
            left: 5 + i * 11 + 5,
            borderRadius: 2,
          }}
        />
      ))}

      {/* Sprinkles on top */}
      {[
        { x: 30, y: 80, rot: 30, color: "#e84393" },
        { x: 70, y: 65, rot: -20, color: "#43c8e8" },
        { x: 55, y: 90, rot: 60, color: "#f4e043" },
        { x: 20, y: 95, rot: -45, color: "#43e88a" },
        { x: 85, y: 85, rot: 15, color: "#e88c43" },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 14,
            height: 5,
            backgroundColor: s.color,
            borderRadius: 3,
            top: s.y,
            left: s.x,
            transform: `rotate(${s.rot}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export const CatIceCream: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const intro = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const coneIntro = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const bgHue = interpolate(frame, [0, durationInFrames], [200, 280]);

  const heartFrames = [30, 90, 150, 210, 270, 330, 390, 450];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${bgHue},70%,85%) 0%, hsl(${bgHue + 40},80%,92%) 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia, serif",
        overflow: "hidden",
      }}
    >
      {/* Floating hearts */}
      {heartFrames.map((hf, i) => {
        const age = frame - hf;
        if (age < 0 || age > 80) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              fontSize: 36,
              opacity: interpolate(age, [0, 20, 60, 80], [0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              top: interpolate(age, [0, 80], [400, 150], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              left: 200 + ((i * 137) % 600),
              transform: `scale(${interpolate(age, [0, 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })})`,
            }}
          >
            ❤️
          </div>
        );
      })}

      {/* Title */}
      <div
        style={{
          fontSize: 64,
          fontWeight: "bold",
          color: "#7b2fa8",
          textShadow: "3px 3px 0 rgba(255,255,255,0.6)",
          marginBottom: 40,
          opacity: intro,
          transform: `translateY(${interpolate(intro, [0, 1], [-30, 0])}px)`,
          letterSpacing: 4,
        }}
      >
        🍦 Kitty's Treat Time 🐱
      </div>

      {/* Main scene */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 60,
        }}
      >
        {/* Cat */}
        <div
          style={{
            opacity: intro,
            transform: `scale(${interpolate(intro, [0, 1], [0.5, 1])}) translateX(${interpolate(intro, [0, 1], [-60, 0])}px)`,
          }}
        >
          <CatFace frame={frame} />
        </div>

        {/* Ice cream */}
        <div
          style={{
            opacity: coneIntro,
            transform: `scale(${interpolate(coneIntro, [0, 1], [0.5, 1])}) translateX(${interpolate(coneIntro, [0, 1], [60, 0])}px)`,
          }}
        >
          <IceCreamCone frame={frame} />
        </div>
      </div>

      {/* Caption */}
      <div
        style={{
          marginTop: 50,
          fontSize: 32,
          color: "#5a1f7a",
          textShadow: "2px 2px 0 rgba(255,255,255,0.5)",
          opacity: interpolate(frame, [20, 50], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {frame < 180
          ? "Mmm... ice cream! 😻"
          : frame < 360
          ? "Lick lick lick... 👅"
          : frame < 480
          ? "This is the best day ever! 🎉"
          : "More please! 🙏"}
      </div>

      {/* Decorative dots */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2 + frame * 0.01;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: `hsl(${(i * 30 + frame) % 360}, 70%, 65%)`,
              top: 540 + Math.sin(angle) * 80,
              left: 960 + Math.cos(angle * 1.3) * 820,
              opacity: 0.5,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
