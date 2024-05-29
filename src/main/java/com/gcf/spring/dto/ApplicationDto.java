package com.gcf.spring.dto;

public class ApplicationDto {
    private String applicationName;
    private String programDetail;
    private String operationPeriod;
    private String approvalStatus;

    // Getter and Setter methods
    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public String getProgramDetail() {
        return programDetail;
    }

    public void setProgramDetail(String programDetail) {
        this.programDetail = programDetail;
    }

    public String getOperationPeriod() {
        return operationPeriod;
    }

    public void setOperationPeriod(String operationPeriod) {
        this.operationPeriod = operationPeriod;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }
}
