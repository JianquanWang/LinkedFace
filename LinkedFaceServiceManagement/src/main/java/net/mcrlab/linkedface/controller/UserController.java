package net.mcrlab.linkedface.controller;

import net.mcrlab.linkedface.entity.User;
import net.mcrlab.linkedface.service.UserService;
import net.mcrlab.linkedface.utils.UploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller("userController")
public class UserController {
    @Autowired
    private UserService userService;

    public void toEdit(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("../user_edit.jsp").forward(request, response);
    }

    public void edit(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String password = request.getParameter("password");
        String password2 = request.getParameter("password2");
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("USER");
        if (password == null || password2 == null){
            request.setAttribute("MSG", "password cannot be null");
            request.getRequestDispatcher("../usr_edit.jsp").forward(request, response);
        }else if (!password.equals(password2)){
            request.setAttribute("MSG", "two passwords mismatch");
            request.getRequestDispatcher("../usr_edit.jsp").forward(request, response);
        }else{
            user.setPassword(password);
            userService.edit(user);
        }
        response.sendRedirect("../main.do");
    }

}
