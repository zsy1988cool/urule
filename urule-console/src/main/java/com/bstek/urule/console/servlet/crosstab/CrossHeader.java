package com.bstek.urule.console.servlet.crosstab;

public class CrossHeader {
    private int a;
    private int b;
    private String c;

    public CrossHeader() {
    }

    public int getRowSpan() {
        return this.a;
    }

    public void setRowSpan(int var1) {
        this.a = var1;
    }

    public int getColSpan() {
        return this.b;
    }

    public void setColSpan(int var1) {
        this.b = var1;
    }

    public String getContent() {
        return this.c;
    }

    public void setContent(String var1) {
        this.c = var1;
    }
}
