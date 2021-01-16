package net.mcrlab.linkedface.utils;

import com.arcsoft.face.*;
import com.arcsoft.face.enums.DetectMode;
import com.arcsoft.face.enums.DetectOrient;
import com.arcsoft.face.enums.ErrorInfo;
import com.arcsoft.face.toolkit.ImageInfo;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import static com.arcsoft.face.toolkit.ImageFactory.getRGBData;

public class ArcsoftUtils {

    public static FaceEngine faceEngine = new FaceEngine(Thread.currentThread().getContextClassLoader().getResource("").toString().replace("classes", "lib").replace("/","\\").replace("file:\\",""));


    public static int init(){
        String appId = "6s7PcJb3azA87AJgYMoibYfNd7dcCZBCxUGS5xDmYk7d";
        String sdkKey = "69V5yYTUMd7t3vu11jf1j2q4hhpQZ1SeTDA8BGA39yC";

        //激活引擎
        int errorCode = faceEngine.activeOnline(appId, sdkKey);

        if (errorCode != ErrorInfo.MOK.getValue() && errorCode != ErrorInfo.MERR_ASF_ALREADY_ACTIVATED.getValue()) {
            System.out.println("Engine activation failed");
        }
        ActiveFileInfo activeFileInfo=new ActiveFileInfo();
        errorCode = faceEngine.getActiveFileInfo(activeFileInfo);
        if (errorCode != ErrorInfo.MOK.getValue() && errorCode != ErrorInfo.MERR_ASF_ALREADY_ACTIVATED.getValue()) {
            System.out.println("Activation file information acquire failed");
        }
        //引擎配置
        EngineConfiguration engineConfiguration = new EngineConfiguration();
        engineConfiguration.setDetectMode(DetectMode.ASF_DETECT_MODE_IMAGE);
        engineConfiguration.setDetectFaceOrientPriority(DetectOrient.ASF_OP_ALL_OUT);
        engineConfiguration.setDetectFaceMaxNum(10);
        engineConfiguration.setDetectFaceScaleVal(32);
        //功能配置
        FunctionConfiguration functionConfiguration = new FunctionConfiguration();
        functionConfiguration.setSupportAge(false);
        functionConfiguration.setSupportFace3dAngle(false);
        functionConfiguration.setSupportFaceDetect(true);
        functionConfiguration.setSupportFaceRecognition(true);
        functionConfiguration.setSupportGender(false);
        functionConfiguration.setSupportLiveness(false);
        functionConfiguration.setSupportIRLiveness(false);
        engineConfiguration.setFunctionConfiguration(functionConfiguration);
        //初始化引擎
        errorCode = faceEngine.init(engineConfiguration);
        if (errorCode != ErrorInfo.MOK.getValue()) {
            System.out.println("Engine initialization failed");
        }
        return errorCode;
    }
    public static FaceFeature faceFeatureExtraction(String path){
        ImageInfo imageInfo = getRGBData(new File(path));
        List<FaceInfo> faceInfoList = new ArrayList<FaceInfo>();
        int errorCode = faceEngine.detectFaces(imageInfo.getImageData(), imageInfo.getWidth(), imageInfo.getHeight(), imageInfo.getImageFormat(), faceInfoList);
        if(faceInfoList.size() > 0){
            FaceFeature faceFeature = new FaceFeature();
            errorCode = faceEngine.extractFaceFeature(imageInfo.getImageData(), imageInfo.getWidth(), imageInfo.getHeight(), imageInfo.getImageFormat(), faceInfoList.get(0), faceFeature);
            System.out.println("Face feature size：" + faceFeature.getFeatureData().length);
            return faceFeature;
        } else{
            System.out.println("Cannot detect face in the photo");
            return null;
        }
    }

    public static FaceSimilar faceCompare(FaceFeature targetFaceFeature, FaceFeature sourceFaceFeature){
        FaceSimilar faceSimilar = new FaceSimilar();
        int errorCode = faceEngine.compareFaceFeature(targetFaceFeature, sourceFaceFeature, faceSimilar);
        System.out.println("Similarity: " + faceSimilar.getScore());
        return faceSimilar;
    }

    public static int unInit(){
        return faceEngine.unInit();
    }

}
