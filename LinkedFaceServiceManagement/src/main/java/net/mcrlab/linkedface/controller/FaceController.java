package net.mcrlab.linkedface.controller;

import com.alibaba.fastjson.JSON;
import net.mcrlab.linkedface.entity.Person;
import net.mcrlab.linkedface.service.PersonService;
import net.mcrlab.linkedface.utils.ArcsoftUtils;
import net.mcrlab.linkedface.utils.UploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import com.arcsoft.face.*;
import com.arcsoft.face.enums.*;
import com.arcsoft.face.toolkit.ImageInfo;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.arcsoft.face.toolkit.ImageInfoEx;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.arcsoft.face.toolkit.ImageFactory.getGrayData;
import static com.arcsoft.face.toolkit.ImageFactory.getRGBData;
@Controller("faceController")
public class FaceController{
    @Autowired
    private PersonService personService;
    //  /face/detect.do
    public void detect(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("access to face/detect.do");
        Map<String, String> map = UploadUtils.uploadFile(request);
        String path = map.get("filePath");
        List<Person> compareResult = new ArrayList<>();
        int errorCode = ArcsoftUtils.init();
        FaceFeature targetFaceFeature = ArcsoftUtils.faceFeatureExtraction(path);
        List<Person> personList = personService.getAll();
        for(Person p : personList){
            FaceFeature sourceFaceFeature = new FaceFeature();
            sourceFaceFeature.setFeatureData(p.getFaceFeature());
            FaceSimilar faceSimilar = ArcsoftUtils.faceCompare(targetFaceFeature, sourceFaceFeature);
            System.out.println(p.getName() + " similar: " + faceSimilar.getScore());
            // test
            //compareResult.add(p);
            //compareResult.add(p);
            if (faceSimilar.getScore() >= 0.8) {
                p.setSimilarity((double) faceSimilar.getScore());
                compareResult.add(p);
            }
        }

        errorCode = ArcsoftUtils.unInit();
        request.setAttribute("RESULT", compareResult);
        System.out.println("compareResult person length:" + compareResult.size());
        for(Person p : compareResult){
            System.out.println(p.toString());
        }
        response.getWriter().write(JSON.toJSON(compareResult).toString());
        System.out.println("Response:"+JSON.toJSON(compareResult).toString());
        // request.getRequestDispatcher("");
    }
}
