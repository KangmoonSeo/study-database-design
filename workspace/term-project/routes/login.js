import express from "express";
import { login } from "../services/login";

const router = express.Router();

router.get("/", (req, res) => {
  req.session.user = null;
  res.render("login");
});

// 로그인 요청
router.post("/", async (req, res) => {
  const data = { id: req.body.id, pw: req.body.pw, role: req.body.role };
  const result = await login(data);

  if (result.role == "") {
    res.send(`<script>
    alert('아이디 또는 비밀번호를 잘못 입력했습니다.');
    location.href='/${result.role}';
    </script>`);
    return;
  }
  req.session.user = {
    id: result.id,
    name: result.name,
    role: result.role,
    checkLogin: true,
  };
  res.redirect(`/${result.role}`);
});

module.exports = router;
