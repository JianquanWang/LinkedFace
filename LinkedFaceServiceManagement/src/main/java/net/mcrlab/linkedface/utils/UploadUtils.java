package net.mcrlab.linkedface.utils;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class UploadUtils {
    public static String getUUIDFileName(String fileName) {
        int idx = fileName.lastIndexOf(".");
        String extention = fileName.substring(idx);
        String uuidFileName = UUID.randomUUID().toString().replace("-", "") + extention;
        return uuidFileName;
    }

    public static Map<String, String> uploadFile(HttpServletRequest request){
        Map<String, String> map = new HashMap<String, String>();
        DiskFileItemFactory diskFileItemFactory = new DiskFileItemFactory();
        ServletFileUpload servletFileUpload = new ServletFileUpload(diskFileItemFactory);
        String url = null;
        String uuidFileName = null;
        try{
            List<FileItem> list = servletFileUpload.parseRequest(request);
            for(FileItem fileItem : list){
                if(fileItem.isFormField()){
                    String name = fileItem.getFieldName();
                    String value = fileItem.getString("UTF-8");
                    map.put(name, value);
                }else{
                    String fileName = fileItem.getName();
                    if(fileName != null && !"".equals(fileName)){
                        uuidFileName = UploadUtils.getUUIDFileName(fileName);
                        InputStream is = fileItem.getInputStream();
                        String path = request.getServletContext().getRealPath("/upload");
                        url = path + "\\" + uuidFileName;
                        OutputStream os = new FileOutputStream(url);
                        int len = 0;
                        byte[] b = new byte[1024];
                        while((len = is.read(b))!=-1){
                            os.write(b, 0, len);;
                        }
                        is.close();
                        os.close();

                        map.put("filePath", url);
                    }
                }
            }
        } catch (FileUploadException | UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return map;
    }
}
