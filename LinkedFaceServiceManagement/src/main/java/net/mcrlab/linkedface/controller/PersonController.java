package net.mcrlab.linkedface.controller;

import com.arcsoft.face.FaceFeature;
import net.mcrlab.linkedface.entity.Person;
import net.mcrlab.linkedface.service.PersonService;
import net.mcrlab.linkedface.utils.ArcsoftUtils;
import net.mcrlab.linkedface.utils.UploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller("personController")
public class PersonController {
    @Autowired
    private PersonService personService;
    //  /person/list.do     /person_list.jsp
    public void list(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Person> list = personService.getAll();
        request.setAttribute("LIST", list);
        request.getRequestDispatcher("../person_list.jsp").forward(request, response);
    }

    public void toAdd(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("../person_add.jsp").forward(request, response);
    }

    public void add(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Map<String, String> map = UploadUtils.uploadFile(request);
        Person person = new Person();
        for(Map.Entry<String, String> entry : map.entrySet()) {
            if ("name".equals(entry.getKey())){
                person.setName(entry.getValue());
            }else if ("linkedinUri".equals(entry.getKey())){
                person.setLinkedinUri(entry.getValue());
            }else if ("organization".equals(entry.getKey())){
                person.setOrganization(entry.getValue());
            }else if ("filePath".equals(entry.getKey())){
                person.setPhotoPath(entry.getValue());
                ArcsoftUtils.init();
                FaceFeature faceFeature = ArcsoftUtils.faceFeatureExtraction(entry.getValue());
                person.setFaceFeature(faceFeature.getFeatureData());
                ArcsoftUtils.unInit();
            }
            System.out.println(entry.getKey() + " " + entry.getValue());
        }
        personService.add(person);
        response.sendRedirect("list.do");
    }
    public void toEdit(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Integer id = Integer.parseInt(request.getParameter("id"));
        Person person = personService.get(id);
        request.setAttribute("OBJ", person);
        request.getRequestDispatcher("../person_edit.jsp").forward(request, response);
    }

    public void edit(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Map<String, String> map = UploadUtils.uploadFile(request);
        Person person = new Person();
        for(Map.Entry<String, String> entry : map.entrySet()) {
            if ("name".equals(entry.getKey())){
                person.setName(entry.getValue());
            }else if ("linkedinUri".equals(entry.getKey())){
                person.setLinkedinUri(entry.getValue());
            }else if ("organization".equals(entry.getKey())){
                person.setOrganization(entry.getValue());
            }else if ("filePath".equals(entry.getKey())){
                person.setPhotoPath(entry.getValue());
                ArcsoftUtils.init();
                FaceFeature faceFeature = ArcsoftUtils.faceFeatureExtraction(entry.getValue());
                person.setFaceFeature(faceFeature.getFeatureData());
                ArcsoftUtils.unInit();
            }else if ("id".equals(entry.getKey())){
                person.setId(Integer.parseInt(entry.getValue()));
            }
            System.out.println(entry.getKey() + " " + entry.getValue());
        }
        if(person.getPhotoPath() == null) {
            person.setPhotoPath(map.get("photoPath"));
        }
        personService.edit(person);
        response.sendRedirect("list.do");
    }

    public void remove(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Integer id = Integer.parseInt(request.getParameter("id"));
        personService.remove(id);
        response.sendRedirect("list.do");
    }
}
