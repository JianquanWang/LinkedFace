package net.mcrlab.linkedface.entity;

public class Person {
    private Integer id;
    private String name;
    private String photoPath;
    private String linkedinUri;
    private String organization;
    private byte[] faceFeature;
    private double similarity;

    public double getSimilarity() {
        return similarity;
    }

    public void setSimilarity(double similarity) {
        this.similarity = similarity;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    public String getLinkedinUri() {
        return linkedinUri;
    }

    public void setLinkedinUri(String linkedinUri) {
        this.linkedinUri = linkedinUri;
    }

    public byte[] getFaceFeature() {
        return faceFeature;
    }

    public void setFaceFeature(byte[] faceFeature) {
        this.faceFeature = faceFeature;
    }
}
