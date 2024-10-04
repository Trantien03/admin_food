// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUserContext } from "./UserContext"; // Import context

// export default function SimpleAuthForm() {
//   const [isRegister, setIsRegister] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const { login } = useUserContext(); // Lấy hàm login từ context
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Thực hiện gọi API để xác thực người dùng (giả định)
//     const userData = { email, name }; // Giả định rằng bạn đã xác thực thành công
//     login(userData); // Lưu thông tin người dùng vào context
//     navigate("/dashboard"); // Chuyển hướng đến trang chính sau khi đăng nhập
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     // Thực hiện gọi API để đăng ký người dùng (giả định)
//     const userData = { email, name }; // Giả định rằng bạn đã đăng ký thành công
//     login(userData); // Lưu thông tin người dùng vào context
//     navigate("/dashboard"); // Chuyển hướng đến trang chính sau khi đăng ký
//   };

//   const toggleForm = () => {
//     setIsRegister(!isRegister);
//   };

//   return (
//     <div className="flex h-dvh bg-slate-100 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img
//           alt="Your Company"
//           src="https://w7.pngwing.com/pngs/636/819/png-transparent-computer-icons-privacy-policy-admin-icon-copyright-rim-share-icon-thumbnail.png"
//           className="mx-auto h-10 w-auto"
//         />
//         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//           {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         {!isRegister ? (
//           <form onSubmit={handleLogin} className="space-y-6">
//             {/* Các trường nhập liệu cho đăng nhập */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//                 Địa chỉ Email
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   autoComplete="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent sm:text-sm"
//                   placeholder="Nhập địa chỉ email"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
//                 Mật khẩu
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   autoComplete="current-password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent sm:text-sm"
//                   placeholder="Nhập mật khẩu"
//                 />
//               </div>
//             </div>
//             <div>
//               <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">
//                 Đăng nhập
//               </button>
//               <p className="text-sm">
//                 <input type="checkbox" required /> Tôi đồng ý với các điều khoản và chính sách bảo mật.
//               </p>
//             </div>
//           </form>
//         ) : (
//           <form onSubmit={handleRegister} className="space-y-6 mt-6">
//             {/* Các trường nhập liệu cho đăng ký */}
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
//                 Tên của bạn
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent sm:text-sm"
//                   placeholder="Nhập tên của bạn"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="emailRegister" className="block text-sm font-medium leading-6 text-gray-900">
//                 Địa chỉ Email
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="emailRegister"
//                   name="email"
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent sm:text-sm"
//                   placeholder="Nhập địa chỉ email"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="passwordRegister" className="block text-sm font-medium leading-6 text-gray-900">
//                 Mật khẩu
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="passwordRegister"
//                   name="password"
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent sm:text-sm"
//                   placeholder="Nhập mật khẩu"
//                 />
//               </div>
//             </div>
//             <div>
//               <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500">
//                 Đăng ký
//               </button>
//               <p className="text-sm">
//                 <input type="checkbox" required /> Tôi đồng ý với các điều khoản và chính sách bảo mật.
//               </p>
//             </div>
//           </form>
//         )}

//         <p className="mt-10 text-center text-sm text-gray-500">
//           {isRegister ? "Đã có tài khoản? " : "Chưa có tài khoản? "}{" "}
//           <a
//             href="#"
//             onClick={toggleForm}
//             className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
//           >
//             {isRegister ? "Đăng nhập" : "Đăng ký"}
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
