// import { StarsProps } from "@/types";
// import { useState, useEffect } from "react";

// const reviews = [
//   {
//     id: 1,
//     name: "Annette Black",
//     role: "Exchange student",
//     rating: 4.8,
//     text: "Driver was punctual, polite, and the car was very clean. Smooth and safe driving the whole way. Really appreciated the professionalism and friendly conversation. Would definitely ride again.",
//     avatar: "AB",
//     color: "#E8A87C",
//     time: "6d",
//   },
//   {
//     id: 2,
//     name: "Marcus Chen",
//     role: "Business traveler",
//     rating: 5.0,
//     text: "Exceptional service! Arrived early, very professional, and kept the ride comfortable throughout. Best experience I've had with a rideshare driver. Highly recommended.",
//     avatar: "MC",
//     color: "#7CB9E8",
//     time: "2w",
//   },
//   {
//     id: 3,
//     name: "Fatima Al-Hassan",
//     role: "Regular commuter",
//     rating: 4.9,
//     text: "Always reliable and courteous. The car is always spotless and the driver knows the best routes. My go-to driver whenever available.",
//     avatar: "FA",
//     color: "#A87CE8",
//     time: "3w",
//   },
// ];

// function Stars({ rating, size = 12 }:StarsProps) {
//   return (
//     <span style={{ color: "#F4C542", fontSize: size, fontWeight: 700 }}>
//       ★ {rating}
//     </span>
//   );
// }

// export default function AcceptingOfferUI() {
//   const [timeLeft, setTimeLeft] = useState(28);
//   const [confirmed, setConfirmed] = useState(false);
//   const [cancelled, setCancelled] = useState(false);

//   useEffect(() => {
//     if (timeLeft <= 0 || confirmed || cancelled) return;
//     const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
//     return () => clearInterval(t);
//   }, [timeLeft, confirmed, cancelled]);

//   const formatTime = (s) =>
//     `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

//   const viewerAvatars = ["#FF6B35", "#4ECDC4", "#45B7D1", "#F7DC6F", "#82E0AA"];

//   if (confirmed) {
//     return (
//       <>
//         <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
//         <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f0f23, #1a1a2e)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif" }}>
//           <div style={{ textAlign: "center", color: "#fff" }}>
//             <div style={{ fontSize: 64, marginBottom: 16 }}>🚗</div>
//             <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>You're on your way!</div>
//             <div style={{ color: "#aaa", fontSize: 15, marginBottom: 24 }}>Jameel Abdullahi is heading to you</div>
//             <button onClick={() => { setConfirmed(false); setTimeLeft(28); }} style={{ padding: "12px 28px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #3A7BFF, #6FBAFF)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}>Back to Demo</button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (cancelled) {
//     return (
//       <>
//         <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
//         <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f0f23, #1a1a2e)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif" }}>
//           <div style={{ textAlign: "center", color: "#fff" }}>
//             <div style={{ fontSize: 64, marginBottom: 16 }}>❌</div>
//             <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Request Cancelled</div>
//             <div style={{ color: "#aaa", fontSize: 15, marginBottom: 24 }}>Looking for another driver...</div>
//             <button onClick={() => { setCancelled(false); setTimeLeft(28); }} style={{ padding: "12px 28px", borderRadius: 12, border: "none", background: "rgba(255,255,255,0.1)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}>Back to Demo</button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
//       <style>{`
//         @keyframes fadeSlideIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
//         .confirm-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 8px 28px rgba(26,26,46,0.5) !important; }
//         .cancel-btn:hover { background: #f5f5f5 !important; }
//         .review-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.08) !important; }
//       `}</style>

//       <div style={{
//         minHeight: "100vh",
//         background: "linear-gradient(160deg, #0f0f23 0%, #1a1a2e 60%, #0d1b35 100%)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 20,
//         fontFamily: "'DM Sans', sans-serif",
//       }}>
//         <div style={{ width: "100%", maxWidth: 390, animation: "fadeSlideIn 0.4s ease" }}>

//           {/* ── Top status card ── */}
//           <div style={{
//             background: "rgba(255,255,255,0.97)",
//             borderRadius: "22px 22px 0 0",
//             padding: "20px 20px 16px",
//             boxShadow: "0 -2px 30px rgba(0,0,0,0.2)",
//           }}>
//             {/* Drag handle */}
//             <div style={{ width: 36, height: 4, background: "#e0e0e0", borderRadius: 4, margin: "0 auto 16px" }} />

//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
//               <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#1a1a2e" }}>
//                 Accepting an offer...
//               </div>
//               <div style={{
//                 background: "#1a1a2e",
//                 color: "#fff",
//                 borderRadius: 20,
//                 padding: "4px 14px",
//                 fontSize: 13,
//                 fontWeight: 700,
//                 fontFamily: "'Syne', sans-serif",
//                 animation: timeLeft <= 10 ? "pulse 1s ease-in-out infinite" : "none",
//               }}>
//                 {formatTime(timeLeft)}
//               </div>
//             </div>

//             {/* Progress bar */}
//             <div style={{ background: "#eee", borderRadius: 10, height: 5, marginBottom: 16, overflow: "hidden" }}>
//               <div style={{
//                 height: "100%",
//                 borderRadius: 10,
//                 background: timeLeft <= 10
//                   ? "linear-gradient(90deg, #ff4757, #ff6b81)"
//                   : "linear-gradient(90deg, #ff4757, #ffa502)",
//                 width: `${(timeLeft / 60) * 100}%`,
//                 transition: "width 1s linear",
//               }} />
//             </div>

//             {/* Viewers */}
//             <div style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               background: "#f7f8fc",
//               borderRadius: 12,
//               padding: "9px 14px",
//               marginBottom: 14,
//             }}>
//               <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>5 drivers are viewing your request...</span>
//               <div style={{ display: "flex" }}>
//                 {viewerAvatars.map((color, i) => (
//                   <div key={i} style={{
//                     width: 26, height: 26, borderRadius: "50%",
//                     background: color, border: "2px solid #fff",
//                     marginLeft: i > 0 ? -8 : 0,
//                   }} />
//                 ))}
//               </div>
//             </div>

//             {/* Cancel button */}
//             <button
//               className="cancel-btn"
//               onClick={() => setCancelled(true)}
//               style={{
//                 width: "100%", padding: "12px 0", borderRadius: 14,
//                 border: "2px solid #eee", background: "#fff",
//                 color: "#555", fontSize: 14, fontWeight: 700,
//                 cursor: "pointer", fontFamily: "'Syne', sans-serif",
//                 transition: "all 0.2s",
//               }}
//             >
//               Cancel request
//             </button>
//           </div>

//           {/* ── Driver profile card ── */}
//           <div style={{
//             background: "#fff",
//             borderTop: "1px solid #f0f0f0",
//             padding: "18px 20px",
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//               {/* Avatar */}
//               <div style={{ position: "relative" }}>
//                 <div style={{
//                   width: 64, height: 64, borderRadius: 16,
//                   background: "linear-gradient(135deg, #E8A87C, #d4875a)",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   fontSize: 20, fontWeight: 800, color: "#fff",
//                   fontFamily: "'Syne', sans-serif",
//                   boxShadow: "0 4px 16px rgba(232,168,124,0.4)",
//                 }}>
//                   JA
//                 </div>
//                 <div style={{
//                   position: "absolute", bottom: -4, right: -4,
//                   width: 18, height: 18, borderRadius: "50%",
//                   background: "#2ECC71", border: "2px solid #fff",
//                 }} />
//               </div>

//               <div style={{ flex: 1 }}>
//                 <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: "#1a1a2e", marginBottom: 3 }}>
//                   Jameel Abdullahi
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
//                   <span style={{ fontSize: 11, background: "#e8f4fd", color: "#3A7BFF", borderRadius: 6, padding: "2px 7px", fontWeight: 600 }}>
//                     United state
//                   </span>
//                   <Stars rating={4.8} size={11} />
//                 </div>
//                 <div style={{ fontSize: 11, color: "#999" }}>
//                   Experience: <strong style={{ color: "#555" }}>6 yrs</strong> &nbsp;·&nbsp;
//                   On time in previous: <strong style={{ color: "#555" }}>Serena</strong>
//                 </div>
//               </div>
//             </div>

//             {/* Divider */}
//             <div style={{ height: 1, background: "#f0f0f0", margin: "16px 0" }} />

//             {/* Car info */}
//             <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "4px 0" }}>
//               <div style={{
//                 width: 72, height: 46,
//                 background: "linear-gradient(135deg, #f5f5f5, #e8e8e8)",
//                 borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
//                 fontSize: 28,
//               }}>
//                 🚗
//               </div>
//               <div>
//                 <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>
//                   Annette Black
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
//                   <span style={{ fontSize: 11, color: "#888" }}>2 seats</span>
//                   <span style={{ color: "#ddd" }}>·</span>
//                   <Stars rating={4.8} size={11} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── Reviews ── */}
//           <div style={{
//             background: "#f7f8fc",
//             padding: "16px 20px 0",
//             borderTop: "1px solid #f0f0f0",
//           }}>
//             <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 12 }}>
//               Reviews <span style={{ color: "#aaa", fontWeight: 500 }}>(29)</span>
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 260, overflowY: "auto", paddingBottom: 4 }}>
//               {reviews.map((review) => (
//                 <div
//                   key={review.id}
//                   className="review-card"
//                   style={{
//                     background: "#fff",
//                     borderRadius: 14,
//                     padding: "12px 14px",
//                     boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//                     transition: "all 0.2s",
//                     cursor: "default",
//                   }}
//                 >
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                       <div style={{
//                         width: 36, height: 36, borderRadius: "50%",
//                         background: `linear-gradient(135deg, ${review.color}, ${review.color}bb)`,
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         fontSize: 12, fontWeight: 700, color: "#fff",
//                         fontFamily: "'Syne', sans-serif",
//                         flexShrink: 0,
//                       }}>
//                         {review.avatar}
//                       </div>
//                       <div>
//                         <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>
//                           {review.name}
//                         </div>
//                         <div style={{ fontSize: 11, color: "#aaa" }}>{review.role}</div>
//                       </div>
//                     </div>
//                     <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
//                       <Stars rating={review.rating} size={11} />
//                       <span style={{ fontSize: 10, color: "#ccc" }}>{review.time}</span>
//                     </div>
//                   </div>
//                   <p style={{ margin: 0, fontSize: 12, color: "#666", lineHeight: 1.6 }}>
//                     {review.text}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination dots */}
//             <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "12px 0" }}>
//               {[0, 1, 2].map((i) => (
//                 <div key={i} style={{
//                   width: i === 0 ? 20 : 6, height: 6,
//                   borderRadius: 3,
//                   background: i === 0 ? "#1a1a2e" : "#ddd",
//                   transition: "all 0.3s",
//                 }} />
//               ))}
//             </div>
//           </div>

//           {/* ── Confirm button ── */}
//           <div style={{
//             background: "#fff",
//             padding: "14px 20px 20px",
//             borderTop: "1px solid #f0f0f0",
//             borderRadius: "0 0 22px 22px",
//             boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
//           }}>
//             <button
//               className="confirm-btn"
//               onClick={() => setConfirmed(true)}
//               style={{
//                 width: "100%",
//                 padding: "15px 0",
//                 borderRadius: 16,
//                 border: "none",
//                 background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d5e 100%)",
//                 color: "#fff",
//                 fontSize: 16,
//                 fontWeight: 700,
//                 cursor: "pointer",
//                 fontFamily: "'Syne', sans-serif",
//                 boxShadow: "0 5px 20px rgba(26,26,46,0.35)",
//                 transition: "all 0.2s",
//                 letterSpacing: 0.3,
//               }}
//             >
//               Confirm
//             </button>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

"use client";

export default function AcceptingOffer(){
  return (
    <h1>Hello World!!!</h1>
  )
}