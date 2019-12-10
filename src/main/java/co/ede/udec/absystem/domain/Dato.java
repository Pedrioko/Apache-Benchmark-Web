package co.ede.udec.absystem.domain;

public class Dato {

    private double x;
    private double y;

    public Dato(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public Dato() {
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    @Override
    public String toString() {
        return "Dato{" +
                "x=" + x +
                ", y=" + y +
                '}';
    }
}
