package com.qcz.qmplatform.module.base;

import com.qcz.qmplatform.common.bean.ResponseResult;
import com.qcz.qmplatform.common.utils.ConfigLoader;
import com.qcz.qmplatform.common.utils.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class BaseController {

    protected static Logger logger = null;

    public BaseController() {
        logger = LoggerFactory.getLogger(this.getClass());
    }

    @PostMapping("/upload")
    @ResponseBody
    public ResponseResult<Map<String, String>> upload(MultipartFile file) throws IOException {
        File targetFileFolder = new File(ConfigLoader.getUploadFilePath());
        if (!targetFileFolder.exists()) {
            targetFileFolder.mkdirs();
        }
        String fileName = DateUtils.format(new Date(), "yyyyMMddhhmmss") + "_" + file.getOriginalFilename();
        File targetFile = new File(targetFileFolder.getCanonicalFile(), fileName);
        file.transferTo(targetFile);
        Map<String, String> response = new HashMap<>();
        response.put("fileName", "/file/" + fileName);
        return ResponseResult.ok(response);
    }

}
