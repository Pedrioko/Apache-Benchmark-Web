package co.ede.udec.absystem.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;

@Controller
public class WebAppContoller {

    @RequestMapping("/")
    public String index(Model model) {
        return "index";
    }
}