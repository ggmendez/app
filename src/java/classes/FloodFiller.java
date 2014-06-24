/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfPoint;
import org.opencv.core.Point;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.highgui.Highgui;
import org.opencv.imgproc.Imgproc;
import org.opencv.imgproc.Moments;

/**
 *
 * @author ggmendez
 */
public class FloodFiller {

    private Mat image = null;
    private Scalar meanColor = null;
    private Point topLeftCorner = null;
    private Mat contoursImage = null;
    private Mat biggestContourImage = null;
    private Rect computedSearchWindow = null;
    private Point massCenter = null;
    private int filledArea;
    private double contourArea;

    public FloodFiller(Mat image) {
        this.image = image;
    }

    public String fillFrom(Point seed, int lo, int up) {

        String path = "";

        Mat object = ObjectGenerator.extract(image, seed.x, seed.y, 10, 10);
        this.meanColor = Core.mean(object);

        Rect ccomp = new Rect();
        Mat mask = Mat.zeros(image.rows() + 2, image.cols() + 2, CvType.CV_8UC1);

        int connectivity = 4;
        int newMaskVal = 255;
        int ffillMode = 1;

        int flags = connectivity + (newMaskVal << 8) + (ffillMode == 1 ? Imgproc.FLOODFILL_FIXED_RANGE : 0);

        Scalar newVal = new Scalar(0.299, 0.587, 0.114);

        Imgproc.threshold(mask, mask, 1, 128, Imgproc.THRESH_BINARY);

//        OpenCVTest.imshow(image, "image");
        filledArea = Imgproc.floodFill(image, mask, seed, newVal, ccomp, new Scalar(lo, lo, lo), new Scalar(up, up, up), flags);

//        OpenCVTest.imshow(image, "image");
//        OpenCVTest.imshow(mask, "mask");
//        Highgui.imwrite("mask.png", mask);
        Mat morphologicalImage = new Mat();

//        Mat element = new Mat(5, 5, CvType.CV_8U, new Scalar(1));
        Mat element = new Mat(3, 3, CvType.CV_8U, new Scalar(1));
        Imgproc.erode(mask, morphologicalImage, element);
        Imgproc.morphologyEx(morphologicalImage, morphologicalImage, Imgproc.MORPH_CLOSE, element, new Point(-1, -1), 9);
//        Imgproc.morphologyEx(morphologicalImage, morphologicalImage, Imgproc.MORPH_CLOSE, element, new Point(-1, -1), 2);
        Imgproc.morphologyEx(morphologicalImage, morphologicalImage, Imgproc.MORPH_OPEN, element, new Point(-1, -1), 2);

        Highgui.imwrite("morphologicalImage.png", morphologicalImage);

        List<MatOfPoint> contours = new ArrayList<MatOfPoint>();
        Imgproc.findContours(morphologicalImage.clone(), contours, new Mat(), Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_NONE);

        // Draw black contours on a white image
        contoursImage = new Mat(morphologicalImage.size(), CvType.CV_8U, new Scalar(255));
        Scalar color = new Scalar(0);
        int thickness = 2;
        Imgproc.drawContours(contoursImage, contours, -1, color, thickness);
        Highgui.imwrite("allContoursImage.png", contoursImage);

        if (contours.size() > 1) {

            int minContourWith = 20;
            int minContourHeight = 20;
            int maxContourWith = 6400 / 2;
            int maxContourHeight = 4800 / 2;

            contours = filterContours(contours, minContourWith, minContourHeight, maxContourWith, maxContourHeight);
        }

        if (contours.size() > 0) {

            MatOfPoint biggestContour = contours.get(0); // getting the bigger contour
            contourArea = Imgproc.contourArea(biggestContour);

            if (contours.size() > 1) {
                biggestContour = Collections.max(contours, new ContourComparator()); // getting the biggest contour in case there are more than one
            }

            Point[] points = biggestContour.toArray();
            path = "M " + (int) points[0].x + " " + (int) points[0].y + " ";
            for (int i = 1; i < points.length; ++i) {
                Point v = points[i];
                path += "L " + (int) v.x + " " + (int) v.y + " ";
            }
            path += "Z";

            // draw all contours in black with a thickness of 2
            biggestContourImage = Mat.zeros(morphologicalImage.size(), CvType.CV_8UC1);
            ArrayList<MatOfPoint> biggestContourList = new ArrayList<MatOfPoint>();
            biggestContourList.add(biggestContour);
            Imgproc.drawContours(biggestContourImage, biggestContourList, -1, color, thickness); //

//            
//            
//            Mat colorArea = Mat.zeros(morphologicalImage.size(), CvType.CV_8UC1);
//            Core.bitwise_and(biggestContourImage, morphologicalImage, colorArea);
//            
//            Highgui.imwrite("colorArea_antes.png", colorArea);
//            
//            ArrayList<Mat> list = new ArrayList<Mat>();
//            list.add(colorArea);
//            list.add(colorArea);
//            list.add(colorArea);
//            
//            Core.merge(list, colorArea);
//            
//            
//            Core.bitwise_and(colorArea, image, colorArea);
//            Highgui.imwrite("colorArea_Despues.png", colorArea);
//            
//            
            // testing the bounding box
            computedSearchWindow = Imgproc.boundingRect(biggestContour);

            topLeftCorner = computedSearchWindow.tl();

            // compute all moments
            Moments mom = Imgproc.moments(biggestContour);

            massCenter = new Point(mom.get_m10() / mom.get_m00(), mom.get_m01() / mom.get_m00());

            // draw black dot
            Core.circle(contoursImage, massCenter, 4, color, 8);
        }

        Highgui.imwrite("biggestContourImage.png", biggestContourImage);

        return path;

    }

    private static ArrayList<MatOfPoint> filterContours(List<MatOfPoint> contours, int minContourWith, int minContourHeight, int maxContourWith, int maxContourHeight) {
        ArrayList<MatOfPoint> results = new ArrayList<MatOfPoint>();
        for (MatOfPoint currentContour : contours) {
            Rect boundingBox = Imgproc.boundingRect(currentContour);
            if (boundingBox.width > minContourWith && boundingBox.height > minContourHeight) {
                if (boundingBox.width < maxContourWith && boundingBox.height < maxContourHeight) {
                    results.add(currentContour);
                }
            }
        }
        return results;
    }

    private static void applyMorphologicalFilters(Mat image) {
        Mat element = new Mat(3, 3, CvType.CV_8U, new Scalar(1));
        Imgproc.erode(image, image, element);
        Imgproc.morphologyEx(image, image, Imgproc.MORPH_CLOSE, element, new Point(-1, -1), 2);
        Imgproc.morphologyEx(image, image, Imgproc.MORPH_OPEN, element, new Point(-1, -1), 2);
    }

    public Mat getImage() {
        return image;
    }

    public void setImage(Mat image) {
        this.image = image;
    }

    public Scalar getMeanColor() {
        return meanColor;
    }

    public void setMeanColor(Scalar meanColor) {
        this.meanColor = meanColor;
    }

    public Point getTopLeftCorner() {
        return topLeftCorner;
    }

    public void setTopLeftCorner(Point topLeftCorner) {
        this.topLeftCorner = topLeftCorner;
    }

    public Mat getContoursImage() {
        return contoursImage;
    }

    public void setContoursImage(Mat contoursImage) {
        this.contoursImage = contoursImage;
    }

    public Mat getBiggestContourImage() {
        return biggestContourImage;
    }

    public void setBiggestContourImage(Mat biggestContourImage) {
        this.biggestContourImage = biggestContourImage;
    }

    public Rect getComputedSearchWindow() {
        return computedSearchWindow;
    }

    public void setComputedSearchWindow(Rect computedSearchWindow) {
        this.computedSearchWindow = computedSearchWindow;
    }

    public Point getMassCenter() {
        return massCenter;
    }

    public void setMassCenter(Point massCenter) {
        this.massCenter = massCenter;
    }

    public int getFilledArea() {
        return filledArea;
    }

    public void setFilledArea(int filledArea) {
        this.filledArea = filledArea;
    }

    public double getContourArea() {
        return contourArea;
    }

    public void setContourArea(double contourArea) {
        this.contourArea = contourArea;
    }
    
    
}
