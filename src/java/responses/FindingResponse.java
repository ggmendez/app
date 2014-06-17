/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package responses;

import org.opencv.core.Point;
import org.opencv.core.Scalar;

/**
 *
 * @author ggmendez
 */
public class FindingResponse {
    
    private String path;
    private Scalar meanColor;
    private Point massCenter;

    public FindingResponse(String path, Scalar meanColor, Point center) {
        this.path = path;
        this.meanColor = meanColor;
        this.massCenter = center;
    }
    
    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Scalar getMeanColor() {
        return meanColor;
    }

    public void setMeanColor(Scalar meanColor) {
        this.meanColor = meanColor;
    } 

    public Point getMassCenter() {
        return massCenter;
    }

    public void setMassCenter(Point massCenter) {
        this.massCenter = massCenter;
    }
    
}
