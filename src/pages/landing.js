/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  Cpu,
  Globe2,
  Heart,
  Layers,
  Lock,
  Radar,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  CheckCircle2,
} from "lucide-react";

import "../styles/landing.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

const authors = [
  { name: "Phong", role: "Đồng phát triển", initial: "Ph" },
  { name: "Thông", role: "Đồng phát triển", initial: "Th" },
  { name: "Quang", role: "Đồng phát triển", initial: "Q" },
  { name: "Thái", role: "Đồng phát triển", initial: "Tá" },
  { name: "Minh", role: "Đồng phát triển", initial: "Mi" },
];

function Landing() {
  return (
    <div className="landing-page">
      <main id="top" className="landing-inner">
        <section className="landing-hero" aria-labelledby="landing-hero-title">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="landing-kicker">
              <Zap size={16} />
              Mạng xã hội cho học tập & kết nối
            </div>
            <h1 id="landing-hero-title">
              Một nền tảng duy nhất cho bảng tin, trò chuyện và khám phá.
            </h1>
            <p className="lead">
              Edu Social tập trung hóa trải nghiệm đăng bài, bình luận, nhắn tin thời gian thực, cuộc gọi
              ngang hàng, Premium và quản trị — phục vụ cộng đồng học tập hiện đại.
            </p>
            <div className="landing-hero-cta">
              <Link to="/register" className="btn-landing btn-landing-primary">
                Tạo tài khoản
              </Link>
              <a href="#gioi-thieu" className="btn-landing btn-landing-ghost">
                Xem tổng quan hệ thống
              </a>
            </div>
            <div className="landing-metrics" role="list">
              <div className="landing-metric" role="listitem">
                <strong>100%</strong>
                <span>Tập trung trên một giao diện</span>
              </div>
              <div className="landing-metric" role="listitem">
                <strong>Realtime</strong>
                <span>Tin nhắn &amp; thông báo tức thì</span>
              </div>
              <div className="landing-metric" role="listitem">
                <strong>P2P</strong>
                <span>Gọi thoại / video ngang hàng</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="landing-hero-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="landing-glass-stack">
              <div className="landing-mini-card">
                <span className="landing-mini-dot" style={{ background: "#2563eb" }} />
                <div>
                  <strong>Bảng tin</strong>
                  <p style={{ margin: "6px 0 0", fontSize: "0.88rem", color: "var(--mono-muted)" }}>
                    Đăng trạng thái, hình ảnh và tương tác như một mạng xã hội học đường.
                  </p>
                </div>
              </div>
              <div className="landing-mini-card">
                <span className="landing-mini-dot" style={{ background: "#059669" }} />
                <div>
                  <strong>Hội thoại</strong>
                  <p style={{ margin: "6px 0 0", fontSize: "0.88rem", color: "var(--mono-muted)" }}>
                    Chat 1-1 hoặc nhóm, kèm cuộc gọi khi cần làm việc nhóm trực tiếp.
                  </p>
                </div>
              </div>
              <div className="landing-mini-card">
                <span className="landing-mini-dot" style={{ background: "#7c3aed" }} />
                <div>
                  <strong>Khám phá</strong>
                  <p style={{ margin: "6px 0 0", fontSize: "0.88rem", color: "var(--mono-muted)" }}>
                    Mở rộng kết nối với gợi ý và luồng nội dung phù hợp sở thích.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section
          id="gioi-thieu"
          className="landing-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="landing-section-head">
            <span className="landing-tag">Tổng quan</span>
            <h2>Edu Social là gì?</h2>
            <p>
              Đây là ứng dụng web kết hợp bảng tin cá nhân, tin nhắn thời gian thực, khám phá người dùng &amp;
              bài viết, hồ sơ chi tiết và gói Premium — được xây dựng để phục vụ hoạt động học tập, chia sẻ
              kiến thức và kết nối an toàn trong một hệ sinh thái thống nhất.
            </p>
          </div>
          <div className="landing-grid-3">
            {[
              {
                icon: <Layers size={22} />,
                title: "Luồng trải nghiệm liền mạch",
                body: "Đăng nhập một lần, di chuyển giữa Trang chủ, Tin nhắn, Khám phá và Hồ sơ mà không vỡ ngữ cảnh.",
              },
              {
                icon: <Globe2 size={22} />,
                title: "Thiết kế cho cộng đồng học tập",
                body: "Tập trung vào chia sẻ nội dung, tương tác có kiểm soát và kênh liên lạc rõ ràng giữa thành viên.",
              },
              {
                icon: <ShieldCheck size={22} />,
                title: "Kiểm soát quyền riêng tư",
                body: "Đổi mật khẩu, phục hồi tài khoản qua email và chế độ tối/sáng để làm việc lâu dài thoải mái.",
              },
            ].map((c, i) => (
              <motion.article key={c.title} className="landing-card" custom={i} variants={fadeUp}>
                <div className="landing-card-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="cong-dong"
          className="landing-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="landing-section-head">
            <span className="landing-tag">Trang chủ</span>
            <h2>Bảng tin &amp; cộng đồng</h2>
            <p>
              Trung tâm của Edu Social là luồng bài viết: đăng trạng thái, đính kèm media, thích và bình luận
              nhiều cấp — giúp lớp học, nhóm project hoặc CLB duy trì nhịp chia sẻ liên tục.
            </p>
          </div>
          <div className="landing-grid-3">
            {[
              {
                icon: <Sparkles size={22} />,
                title: "Đăng bài &amp; cập nhật trạng thái",
                body: "Modal trạng thái cho phép chia sẻ nhanh suy nghĩ, hình ảnh hoặc tiến độ học tập.",
              },
              {
                icon: <Heart size={22} />,
                title: "Thích &amp; lưu trữ",
                body: "Thể hiện sự đồng cảm và quay lại nội dung quan trọng từ trang cá nhân.",
              },
              {
                icon: <Users size={22} />,
                title: "Bình luận &amp; thảo luận",
                body: "Luồng bình luận chi tiết với menu thao tác, giữ cuộc trò chuyện gọn và có trật tự.",
              },
            ].map((c, i) => (
              <motion.article key={c.title} className="landing-card" custom={i} variants={fadeUp}>
                <div className="landing-card-icon">{c.icon}</div>
                <h3 dangerouslySetInnerHTML={{ __html: c.title }} />
                <p dangerouslySetInnerHTML={{ __html: c.body }} />
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="nhan-tin"
          className="landing-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="landing-split">
            <div>
              <div className="landing-section-head" style={{ marginBottom: 20 }}>
                <span className="landing-tag">Liên lạc</span>
                <h2>Nhắn tin, nhóm chat &amp; cuộc gọi</h2>
                <p>
                  Module tin nhắn kết nối Socket.io để đồng bộ online/offline, đẩy tin nhắn ngay lập tức và phối
                  hợp với PeerJS cho luồng thoại/video ngang hàng khi bạn cần họp nhóm hoặc giải đáp trực tiếp.
                </p>
              </div>
              <div className="landing-tech-row">
                <span className="landing-pill">Socket.io</span>
                <span className="landing-pill">PeerJS</span>
                <span className="landing-pill">Danh sách hội thoại</span>
                <span className="landing-pill">Modal nhóm</span>
              </div>
            </div>
            <div className="landing-panel">
              <h3 style={{ fontWeight: 800, fontSize: "1.05rem" }}>Điểm nhấn kỹ thuật</h3>
              <ul>
                <li>
                  <CheckCircle2 size={18} />
                  Tự động kết nối lại socket khi phiên làm việc dài hoặc mạng không ổn định.
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  Peer host/thiết lập bảo mật linh hoạt cho môi trường local và production.
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  Giao diện chat tách trái/phải — dễ theo dõi lịch sử và media trong hội thoại.
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="kham-pha"
          className="landing-section landing-split landing-split-reverse"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div>
            <div className="landing-section-head" style={{ marginBottom: 20 }}>
              <span className="landing-tag">Khám phá</span>
              <h2>Mở rộng mối quan hệ &amp; nội dung</h2>
              <p>
                Trang Discover giúp bạn tìm người dùng mới, khám phá bài viết nổi bật và là điểm khởi đầu để mạng
                lưới học tập của bạn không ngừng mở rộng.
              </p>
            </div>
            <div className="landing-grid-3" style={{ gridTemplateColumns: "1fr" }}>
              <article className="landing-card">
                <div className="landing-card-icon">
                  <Radar size={22} />
                </div>
                <h3>Gợi ý &amp; xu hướng</h3>
                <p>Lướt nội dung phù hợp sở thích, kết nối với người có chung mục tiêu học tập.</p>
              </article>
            </div>
          </div>
          <div className="landing-panel landing-split-visual">
            <h3 style={{ fontWeight: 800, marginBottom: 12 }}>Luồng sử dụng gợi ý</h3>
            <p style={{ color: "var(--mono-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              Sau khi làm quen trên bảng tin, người dùng chuyển sang Discover để theo dõi profile chi tiết, gửi
              tin nhắn hoặc mời vào nhóm học — tất cả trong cùng một hệ thống.
            </p>
            <div className="landing-tech-row">
              <span className="landing-pill">Profile chi tiết</span>
              <span className="landing-pill">Theo dõi</span>
              <span className="landing-pill">Post thumb</span>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="ho-so"
          className="landing-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="landing-section-head">
            <span className="landing-tag">Cá nhân hóa</span>
            <h2>Hồ sơ, Premium &amp; quản trị</h2>
            <p>
              Trang profile hiển thị bài viết, người theo dõi, bài đã lưu và chỉnh sửa thông tin công khai. Gói
              Premium mở thêm giá trị (truy cập qua menu người dùng), trong khi vai trò Admin có dashboard riêng
              khi bạn cần điều hành nền tảng.
            </p>
          </div>
          <div className="landing-grid-3">
            {[
              {
                icon: <BookOpen size={22} />,
                title: "Profile đa thành phần",
                body: "Posts, Saved, Followers/Following và chỉnh sửa hồ sơ trong một layout nhất quán.",
              },
              {
                icon: <Sparkles size={22} />,
                title: "Premium &amp; thanh toán",
                body: "Luồng nâng cấp và trang thành công sau khi hoàn tất giao dịch.",
              },
              {
                icon: <Cpu size={22} />,
                title: "Admin",
                body: "Hiển thị cho tài khoản có role admin — quản lý và giám sát theo chính sách nội bộ.",
              },
            ].map((c) => (
              <article key={c.title} className="landing-card">
                <div className="landing-card-icon">{c.icon}</div>
                <h3 dangerouslySetInnerHTML={{ __html: c.title }} />
                <p dangerouslySetInnerHTML={{ __html: c.body }} />
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="landing-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="landing-split">
            <div className="landing-section-head" style={{ marginBottom: 0 }}>
              <span className="landing-tag">Thông báo</span>
              <h2>Trung tâm hoạt động</h2>
              <p>
                Chuông thông báo tích hợp trong header giúp bạn nắm lượt thích, bình luận, follow và các sự kiện
                quan trọng khác ngay khi chúng xảy ra — đồng bộ với backend qua token đã đăng nhập.
              </p>
            </div>
            <div className="landing-panel landing-split-visual">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="landing-card-icon" style={{ marginBottom: 0 }}>
                  <Bell size={22} />
                </div>
                <div>
                  <strong style={{ fontSize: "1.05rem" }}>Notify modal</strong>
                  <p style={{ margin: "6px 0 0", color: "var(--mono-muted)", fontSize: "0.92rem" }}>
                    Danh sách thông báo gọn nhẹ, phù hợp kiểm tra nhanh giữa các phiên học.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="bao-mat"
          className="landing-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="landing-section-head">
            <span className="landing-tag">Tài khoản</span>
            <h2>Bảo mật &amp; phục hồi</h2>
            <p>
              Hệ thống hỗ trợ đăng ký, đăng nhập, quên mật khẩu và đặt lại qua liên kết token; đồng thời có trang
              đổi mật khẩu cho người dùng đang đăng nhập — giúp bạn chủ động bảo vệ phiên làm việc.
            </p>
          </div>
          <div className="landing-grid-3">
            {[
              {
                icon: <Lock size={22} />,
                title: "Xác thực &amp; phiên",
                body: "Refresh token và Redux giữ trạng thái đăng nhập nhất quán trên các trang.",
              },
              {
                icon: <ShieldCheck size={22} />,
                title: "Đặt lại mật khẩu",
                body: "Luồng email/token chuẩn hóa cho người quên mật khẩu.",
              },
              {
                icon: <Heart size={22} />,
                title: "Theme linh hoạt",
                body: "Chuyển sáng/tối ngay trong menu người dùng để giảm mỏi mắt khi học đêm.",
              },
            ].map((c) => (
              <article key={c.title} className="landing-card">
                <div className="landing-card-icon">{c.icon}</div>
                <h3 dangerouslySetInnerHTML={{ __html: c.title }} />
                <p dangerouslySetInnerHTML={{ __html: c.body }} />
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="cong-nghe"
          className="landing-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="landing-section-head">
            <span className="landing-tag">Nền tảng</span>
            <h2>Công nghệ lõi của Edu Social</h2>
            <p>
              Front-end được xây dựng trên React 18, Redux Thunk cho luồng async, React Query cho cache dữ liệu,
              React Router v6 cho điều hướng động (`PageRender`), Axios để gọi API và các thư viện UI hiện đại.
            </p>
          </div>
          <div className="landing-panel" style={{ maxWidth: 880 }}>
            <div className="landing-tech-row">
              {[
                "React 18",
                "Redux + Thunk",
                "@tanstack/react-query",
                "React Router v6",
                "Axios",
                "Socket.io client",
                "PeerJS",
                "Framer Motion",
                "Lucide Icons",
                "Bootstrap 4",
              ].map((t) => (
                <span key={t} className="landing-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="lo-trinh"
          className="landing-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="landing-section-head">
            <span className="landing-tag">Trải nghiệm</span>
            <h2>Lộ trình làm quen trong 4 bước</h2>
            <p>
              Gợi ý thực tế giúp người mới nhanh chóng hiểu các khối chức năng chính của hệ thống hiện tại — từ
              đăng nhập đến hợp tác real-time.
            </p>
          </div>
          <div className="landing-timeline">
            {[
              {
                n: "1",
                title: "Khởi tạo tài khoản",
                desc: "Đăng ký, xác nhận email và đăng nhập để đồng bộ token &amp; socket.",
              },
              {
                n: "2",
                title: "Tạo nội dung trên bảng tin",
                desc: "Đăng trạng thái, tương tác thích/bình luận và theo dõi gợi ý bên sidebar.",
              },
              {
                n: "3",
                title: "Mở rộng qua Discover &amp; Profile",
                desc: "Tìm người dùng mới, xem chi tiết profile và gửi tin nhắn khi cần.",
              },
              {
                n: "4",
                title: "Nâng cấp &amp; tinh chỉnh",
                desc: "Kích hoạt Premium (nếu cần), bật chế độ tối và cấu hình thông báo phù hợp.",
              },
            ].map((s) => (
              <div key={s.n} className="landing-step">
                <div className="landing-step-num">{s.n}</div>
                <div className="landing-step-body">
                  <h4 dangerouslySetInnerHTML={{ __html: s.title }} />
                  <p dangerouslySetInnerHTML={{ __html: s.desc }} />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="landing-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="landing-section-head">
            <span className="landing-tag">Giá trị</span>
            <h2>Vì sao chọn Edu Social?</h2>
            <p>Những lợi ích rút ra trực tiếp từ kiến trúc và các module đã triển khai trong phiên bản hiện tại.</p>
          </div>
          <div className="landing-grid-3">
            {[
              {
                title: "Realtime-first",
                body: "Socket giữ kết nối linh hoạt — phù hợp lớp học ảo hay làm việc nhóm phân tán.",
              },
              {
                title: "Tất cả trong một SPA",
                body: "Không cần chuyển sang công cụ chat hay meeting riêng cho các tác vụ cơ bản.",
              },
              {
                title: "Mở rộng dần",
                body: "Premium và Admin cho phép định hướng doanh thu và vận hành khi nền tảng phát triển.",
              },
            ].map((c) => (
              <article key={c.title} className="landing-card">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="faq"
          className="landing-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="landing-section-head">
            <span className="landing-tag">FAQ</span>
            <h2>Câu hỏi thường gặp</h2>
          </div>
          <div className="landing-faq">
            {[
              {
                q: "Tôi có thể dùng Edu Social mà không đăng nhập không?",
                a: "Một số trang công khai (như đăng nhập/đăng ký và landing này) luôn mở; còn bảng tin, tin nhắn và profile yêu cầu xác thực để bảo vệ dữ liệu.",
              },
              {
                q: "Cuộc gọi hoạt động như thế nào?",
                a: "Ứng dụng dùng PeerJS để thiết lập kết nối ngang hàng; khi triển khai production bạn cần cấu hình host/port TLS phù hợp với máy chủ Peer của mình.",
              },
              {
                q: "Premium khác gì so với tài khoản thường?",
                a: "Premium là lớp giá trị gia tăng được tích hợp sẵn luồng thanh toán và trang xác nhận — chi tiết cụ thể phụ thuộc cấu hình backend và gói dịch vụ bạn triển khai.",
              },
              {
                q: "Ai có quyền truy cập trang Admin?",
                a: "Chỉ những tài khoản có role admin mới thấy mục Admin trong menu điều hướng — giúp phân tách rõ người dùng thường và đội vận hành.",
              },
            ].map((item) => (
              <div key={item.q} className="landing-faq-item">
                <strong>{item.q}</strong>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="doi-ngu"
          className="landing-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="landing-section-head">
            <span className="landing-tag">Con người</span>
            <h2>Đội ngũ phát triển</h2>
            <p>
              Edu Social được định hình và hiện thực hóa bởi các thành viên:{" "}
              <strong>Phong, Thông, Quang, Thái, Minh</strong> — cùng chung mục tiêu xây dựng trải nghiệm học tập
              kết nối, hiện đại và an toàn.
            </p>
          </div>
          <div className="landing-authors">
            {authors.map((a) => (
              <div key={a.name} className="landing-author">
                <div className="landing-author-avatar" aria-hidden>
                  {a.initial}
                </div>
                <div className="landing-author-name">{a.name}</div>
                <div className="landing-author-role">{a.role}</div>
              </div>
            ))}
          </div>
        </motion.section>

        <section className="landing-cta-band" aria-labelledby="landing-cta-title">
          <h2 id="landing-cta-title">Sẵn sàng tham gia Edu Social?</h2>
          <p>Tạo tài khoản trong vài phút và khám phá toàn bộ tính năng realtime của nền tảng.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register" className="btn-landing btn-landing-primary">
              Đăng ký ngay
            </Link>
            <Link to="/login" className="btn-landing btn-landing-ghost" style={{ background: "rgba(255,255,255,0.14)", borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}>
              Đã có tài khoản
            </Link>
          </div>
        </section>

        <footer className="landing-footer">
          <span>© {new Date().getFullYear()} Edu Social — Landing giới thiệu hệ thống.</span>
          <div className="landing-footer-links">
            <Link to="/login">Đăng nhập</Link>
            <Link to="/register">Đăng ký</Link>
            <a href="#top">Về đầu trang</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Landing;
