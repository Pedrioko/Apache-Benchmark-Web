package co.ede.udec.absystem.controllers;

import co.ede.udec.absystem.domain.Peticion;
import co.ede.udec.absystem.domain.Result;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@RestController
public class RestApi {


    @RequestMapping(value = "/ab", method = RequestMethod.POST)
    public String getBenchmark(@RequestBody Peticion peticion) throws Exception {
        String cmd = "C:\\ProgramData\\AB\\ab.exe -n " + peticion.getCount() + " -c " + peticion.getConcurrent() + " " + peticion.getUrl().replace("https", "http");
        Process p = Runtime.getRuntime().exec(cmd);
        p.waitFor();
        BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
        String cad = "";
        String line = "";
        String json = "";
        String table = "\"tabletime\": [ ";
        boolean flag = false;
        while ((line = reader.readLine()) != null) {
            cad += line + "\n";
            if (line.contains("(Connect:"))
                continue;

            if (flag == false && line.contains("done"))
                flag = true;
            else if (line.contains(":") && flag == true && !line.isEmpty()) {
                String[] split = line.split(":");
                json += "\"" + split[0].replace(" ", "_") + "\":";
                String trim = split[1].trim();
                if (trim.contains(" ") && !trim.contains("[") && !trim.contains("(") && !trim.contains("bytes") && !trim.contains("seconds"))
                    json += "[" + trim.replace("  ", " ").replace(" ", ",") + "],";
                else
                    json += "\"" + trim + "\",";
            }

            if (line.contains("%")) {
                String[] split = line.split("%");
                table += "{ \"porcentaje\":\"" + split[0].trim() + "\", \"cantidad\" :\"" + split[1].trim() + "\"},";
            }
        }
        cad = cad.trim();

        System.out.println("cad: " + cad.split("done")[1]);
        String s = "{" + json + table + "]}";
        return s.replace("},]", "}]").replace(",,", ",").replace(",,", ",");
    }

}