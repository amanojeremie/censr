import java.awt.*;
import java.awt.event.*;
import java.io.IOException;

public static void main (String[] args){
    try {
    		Robot robot = new Robot();
    		
            // Simulate a key press
            robot.keyPress(KeyEvent.VK_M);
            robot.keyRelease(KeyEvent.VK_M);

            robot.delay (5000);
            robot.keyPress(KeyEvent.VK_M);
            robot.keyRelease(KeyEvent.VK_M);

    } catch (AWTException e) {
            e.printStackTrace();
    }
}