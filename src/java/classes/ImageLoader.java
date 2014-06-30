/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package classes;

import java.io.File;
import org.opencv.core.Mat;
import org.opencv.highgui.Highgui;

/**
 *
 * @author ggmendez
 */
public class ImageLoader {

    public static Mat loadImage (String imageFileName) {
  
        // TODO: This path should be saved in a configuration file
//        File path = new File("/Users/ggmendez/Development/app/app/uploads");
        File path = new File("C:/Users/Gonzalo/Documents/NetBeansProjects/app/uploads");
        String fileName = path + "/" + imageFileName;
        System.out.println("fileName: " + fileName);
        Mat image = Highgui.imread(fileName);
        return image;
    }
    
}
