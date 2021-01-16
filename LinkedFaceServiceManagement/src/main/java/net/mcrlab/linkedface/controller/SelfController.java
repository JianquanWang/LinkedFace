package net.mcrlab.linkedface.controller;

import net.mcrlab.linkedface.entity.User;
import net.mcrlab.linkedface.service.SelfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Controller("selfController")
public class SelfController {
    @Autowired
    private SelfService selfService;
    //      /toLogin.do
    public void toLogin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("login.jsp").forward(request, response);
    }
    //      /login.do
    public void login(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String account = request.getParameter("account");
        String password = request.getParameter("password");

        User user = selfService.login(account, password);
        if(user == null){
            response.sendRedirect("toLogin.do");
        }else{
            HttpSession session = request.getSession();
            session.setAttribute("USER", user);
            response.sendRedirect("main.do");
        }
    }

    //      /logout.do
    public void logout(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        session.setAttribute("USER", null);
        response.sendRedirect("toLogin.do");

    }
    //      /main.do
    public void main(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("index.jsp").forward(request, response);
    }

}
