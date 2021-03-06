/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import classes.FloodFiller;
import classes.ImageLoader;
import classes.ObjectGenerator;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.opencv.core.Mat;
import org.opencv.core.Point;
import org.opencv.core.Scalar;
import responses.FindingResponse;

/**
 *
 * @author ggmendez
 */
public class FillArea extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {

            String paramX = request.getParameter("x");
            String paramY = request.getParameter("y");
            String imageFileName = request.getParameter("imageId") + ".png";

            double x = Double.parseDouble(paramX);
            double y = Double.parseDouble(paramY);

            Mat image = ImageLoader.loadImage(imageFileName);
            
            FloodFiller floodFiller = new FloodFiller(image);
            Point from = new Point(x, y);
            int lo = 60;
            int up = 60;

            String path = floodFiller.fillFrom(from, lo, up);

            Scalar meanColor = floodFiller.getMeanColor();
            Point topLeftPoint = floodFiller.getTopLeftCorner();
            
            int filledArea = floodFiller.getFilledArea();
            double contourArea = floodFiller.getContourArea();            

            FindingResponse findingResponse = new FindingResponse(path, meanColor, topLeftPoint, filledArea, contourArea);

            Gson gson = new Gson();
            String jsonResponse = gson.toJson(findingResponse, FindingResponse.class);

            out.println(jsonResponse);

        } finally {
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
