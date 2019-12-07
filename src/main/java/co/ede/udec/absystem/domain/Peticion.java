package co.ede.udec.absystem.domain;

public class Peticion {

    private long count;
    private long concurrent;
    private String url;

    public Peticion(long count, long concurrent, String url) {
        this.count = count;
        this.concurrent = concurrent;
        this.url = url;
    }

    public Peticion() {
        this.concurrent = 10;
        this.count = 10;
        this.url = "";
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public long getConcurrent() {
        return concurrent;
    }

    public void setConcurrent(long concurrent) {
        this.concurrent = concurrent;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
