// Auto-generated from 111-Body.gltf
// WebGL GLSL ES 版本
precision mediump float;

// 模型信息
const vec3 MODEL_CENTER = vec3(0.000000, 0.005000, -0.000005);
const vec3 MODEL_SIZE = vec3(0.055143, 0.010000, 0.055138);
const float MODEL_SCALE = 18.134720;

// 顶点数量和三角形数量
const int VERTEX_COUNT = 228;
const int TRIANGLE_COUNT = 226;

// 获取顶点位置
vec3 getPosition(int index) {
    if (index == 0) return vec3(0.000000, 0.000000, -0.027574);
        else if (index == 1) return vec3(0.000000, 0.010000, -0.027574);
    else if (index == 2) return vec3(-0.001532, 0.010000, -0.027531);
    else if (index == 3) return vec3(-0.003060, 0.010000, -0.027404);
    else if (index == 4) return vec3(-0.004578, 0.010000, -0.027191);
    else if (index == 5) return vec3(-0.006082, 0.010000, -0.026895);
    else if (index == 6) return vec3(-0.007568, 0.010000, -0.026515);
    else if (index == 7) return vec3(-0.009030, 0.010000, -0.026054);
    else if (index == 8) return vec3(-0.010464, 0.010000, -0.025512);
    else if (index == 9) return vec3(-0.011865, 0.010000, -0.024891);
    else if (index == 10) return vec3(-0.013230, 0.010000, -0.024193);
    else if (index == 11) return vec3(-0.014554, 0.010000, -0.023420);
    else if (index == 12) return vec3(-0.015833, 0.010000, -0.022575);
    else if (index == 13) return vec3(-0.017063, 0.010000, -0.021660);
    else if (index == 14) return vec3(-0.018241, 0.010000, -0.020679);
    else if (index == 15) return vec3(-0.019362, 0.010000, -0.019633);
    else if (index == 16) return vec3(-0.020423, 0.010000, -0.018526);
    else if (index == 17) return vec3(-0.021421, 0.010000, -0.017363);
    else if (index == 18) return vec3(-0.022353, 0.010000, -0.016146);
    else if (index == 19) return vec3(-0.023216, 0.010000, -0.014878);
    else if (index == 20) return vec3(-0.024007, 0.010000, -0.013565);
    else if (index == 21) return vec3(-0.024723, 0.010000, -0.012210);
    else if (index == 22) return vec3(-0.025364, 0.010000, -0.010817);
    else if (index == 23) return vec3(-0.025926, 0.010000, -0.009391);
    else if (index == 24) return vec3(-0.026408, 0.010000, -0.007936);
    else if (index == 25) return vec3(-0.026808, 0.010000, -0.006456);
    else if (index == 26) return vec3(-0.027125, 0.010000, -0.004956);
    else if (index == 27) return vec3(-0.027359, 0.010000, -0.003441);
    else if (index == 28) return vec3(-0.027508, 0.010000, -0.001915);
    else if (index == 29) return vec3(-0.027571, 0.010000, -0.000383);
    else if (index == 30) return vec3(-0.027550, 0.010000, 0.001150);
    else if (index == 31) return vec3(-0.027444, 0.010000, 0.002679);
    else if (index == 32) return vec3(-0.027252, 0.010000, 0.004200);
    else if (index == 33) return vec3(-0.026977, 0.010000, 0.005708);
    else if (index == 34) return vec3(-0.026618, 0.010000, 0.007198);
    else if (index == 35) return vec3(-0.026177, 0.010000, 0.008667);
    else if (index == 36) return vec3(-0.025655, 0.010000, 0.010108);
    else if (index == 37) return vec3(-0.025053, 0.010000, 0.011518);
    else if (index == 38) return vec3(-0.024374, 0.010000, 0.012893);
    else if (index == 39) return vec3(-0.023620, 0.010000, 0.014227);
    else if (index == 40) return vec3(-0.022793, 0.010000, 0.015518);
    else if (index == 41) return vec3(-0.021895, 0.010000, 0.016761);
    else if (index == 42) return vec3(-0.020930, 0.010000, 0.017952);
    else if (index == 43) return vec3(-0.019900, 0.010000, 0.019087);
    else if (index == 44) return vec3(-0.018809, 0.010000, 0.020164);
    else if (index == 45) return vec3(-0.017659, 0.010000, 0.021178);
    else if (index == 46) return vec3(-0.016455, 0.010000, 0.022126);
    else if (index == 47) return vec3(-0.015200, 0.010000, 0.023007);
    else if (index == 48) return vec3(-0.013898, 0.010000, 0.023816);
    else if (index == 49) return vec3(-0.012553, 0.010000, 0.024551);
    else if (index == 50) return vec3(-0.011169, 0.010000, 0.025211);
    else if (index == 51) return vec3(-0.009750, 0.010000, 0.025793);
    else if (index == 52) return vec3(-0.008302, 0.010000, 0.026295);
    else if (index == 53) return vec3(-0.006828, 0.010000, 0.026715);
    else if (index == 54) return vec3(-0.005332, 0.010000, 0.027054);
    else if (index == 55) return vec3(-0.003821, 0.010000, 0.027308);
    else if (index == 56) return vec3(-0.002297, 0.010000, 0.027478);
    else if (index == 57) return vec3(-0.000767, 0.010000, 0.027563);
    else if (index == 58) return vec3(0.000767, 0.010000, 0.027563);
    else if (index == 59) return vec3(0.002297, 0.010000, 0.027478);
    else if (index == 60) return vec3(0.003821, 0.010000, 0.027308);
    else if (index == 61) return vec3(0.005332, 0.010000, 0.027054);
    else if (index == 62) return vec3(0.006828, 0.010000, 0.026715);
    else if (index == 63) return vec3(0.008302, 0.010000, 0.026295);
    else if (index == 64) return vec3(0.009750, 0.010000, 0.025793);
    else if (index == 65) return vec3(0.011169, 0.010000, 0.025211);
    else if (index == 66) return vec3(0.012553, 0.010000, 0.024551);
    else if (index == 67) return vec3(0.013898, 0.010000, 0.023816);
    else if (index == 68) return vec3(0.015200, 0.010000, 0.023007);
    else if (index == 69) return vec3(0.016455, 0.010000, 0.022126);
    else if (index == 70) return vec3(0.017659, 0.010000, 0.021178);
    else if (index == 71) return vec3(0.018809, 0.010000, 0.020164);
    else if (index == 72) return vec3(0.019900, 0.010000, 0.019087);
    else if (index == 73) return vec3(0.020930, 0.010000, 0.017952);
    else if (index == 74) return vec3(0.021895, 0.010000, 0.016761);
    else if (index == 75) return vec3(0.022793, 0.010000, 0.015518);
    else if (index == 76) return vec3(0.023620, 0.010000, 0.014227);
    else if (index == 77) return vec3(0.024374, 0.010000, 0.012893);
    else if (index == 78) return vec3(0.025053, 0.010000, 0.011518);
    else if (index == 79) return vec3(0.025655, 0.010000, 0.010108);
    else if (index == 80) return vec3(0.026177, 0.010000, 0.008667);
    else if (index == 81) return vec3(0.026618, 0.010000, 0.007198);
    else if (index == 82) return vec3(0.026977, 0.010000, 0.005708);
    else if (index == 83) return vec3(0.027252, 0.010000, 0.004200);
    else if (index == 84) return vec3(0.027444, 0.010000, 0.002679);
    else if (index == 85) return vec3(0.027550, 0.010000, 0.001150);
    else if (index == 86) return vec3(0.027571, 0.010000, -0.000383);
    else if (index == 87) return vec3(0.027508, 0.010000, -0.001915);
    else if (index == 88) return vec3(0.027359, 0.010000, -0.003441);
    else if (index == 89) return vec3(0.027125, 0.010000, -0.004956);
    else if (index == 90) return vec3(0.026808, 0.010000, -0.006456);
    else if (index == 91) return vec3(0.026408, 0.010000, -0.007936);
    else if (index == 92) return vec3(0.025926, 0.010000, -0.009391);
    else if (index == 93) return vec3(0.025364, 0.010000, -0.010817);
    else if (index == 94) return vec3(0.024723, 0.010000, -0.012210);
    else if (index == 95) return vec3(0.024007, 0.010000, -0.013565);
    else if (index == 96) return vec3(0.023216, 0.010000, -0.014878);
    else if (index == 97) return vec3(0.022353, 0.010000, -0.016146);
    else if (index == 98) return vec3(0.021421, 0.010000, -0.017363);
    else if (index == 99) return vec3(0.020423, 0.010000, -0.018526);
    else if (index == 100) return vec3(0.019362, 0.010000, -0.019633);
    else if (index == 101) return vec3(0.018241, 0.010000, -0.020679);
    else if (index == 102) return vec3(0.017063, 0.010000, -0.021660);
    else if (index == 103) return vec3(0.015833, 0.010000, -0.022575);
    else if (index == 104) return vec3(0.014554, 0.010000, -0.023420);
    else if (index == 105) return vec3(0.013230, 0.010000, -0.024193);
    else if (index == 106) return vec3(0.011865, 0.010000, -0.024891);
    else if (index == 107) return vec3(0.010464, 0.010000, -0.025512);
    else if (index == 108) return vec3(0.009030, 0.010000, -0.026054);
    else if (index == 109) return vec3(0.007568, 0.010000, -0.026515);
    else if (index == 110) return vec3(0.006082, 0.010000, -0.026895);
    else if (index == 111) return vec3(0.004578, 0.010000, -0.027191);
    else if (index == 112) return vec3(0.003060, 0.010000, -0.027404);
    else if (index == 113) return vec3(0.001532, 0.010000, -0.027531);
    else if (index == 114) return vec3(0.000000, 0.010000, -0.027574);
    else if (index == 115) return vec3(0.000000, 0.000000, -0.027574);
    else if (index == 116) return vec3(-0.001532, 0.000000, -0.027531);
    else if (index == 117) return vec3(-0.003060, 0.000000, -0.027404);
    else if (index == 118) return vec3(-0.004578, 0.000000, -0.027191);
    else if (index == 119) return vec3(-0.006082, 0.000000, -0.026895);
    else if (index == 120) return vec3(-0.007568, 0.000000, -0.026515);
    else if (index == 121) return vec3(-0.009030, 0.000000, -0.026054);
    else if (index == 122) return vec3(-0.010464, 0.000000, -0.025512);
    else if (index == 123) return vec3(-0.011865, 0.000000, -0.024891);
    else if (index == 124) return vec3(-0.013230, 0.000000, -0.024193);
    else if (index == 125) return vec3(-0.014554, 0.000000, -0.023420);
    else if (index == 126) return vec3(-0.015833, 0.000000, -0.022575);
    else if (index == 127) return vec3(-0.017063, 0.000000, -0.021660);
    else if (index == 128) return vec3(-0.018241, 0.000000, -0.020679);
    else if (index == 129) return vec3(-0.019362, 0.000000, -0.019633);
    else if (index == 130) return vec3(-0.020423, 0.000000, -0.018526);
    else if (index == 131) return vec3(-0.021421, 0.000000, -0.017363);
    else if (index == 132) return vec3(-0.022353, 0.000000, -0.016146);
    else if (index == 133) return vec3(-0.023216, 0.000000, -0.014878);
    else if (index == 134) return vec3(-0.024007, 0.000000, -0.013565);
    else if (index == 135) return vec3(-0.024723, 0.000000, -0.012210);
    else if (index == 136) return vec3(-0.025364, 0.000000, -0.010817);
    else if (index == 137) return vec3(-0.025926, 0.000000, -0.009391);
    else if (index == 138) return vec3(-0.026408, 0.000000, -0.007936);
    else if (index == 139) return vec3(-0.026808, 0.000000, -0.006456);
    else if (index == 140) return vec3(-0.027125, 0.000000, -0.004956);
    else if (index == 141) return vec3(-0.027359, 0.000000, -0.003441);
    else if (index == 142) return vec3(-0.027508, 0.000000, -0.001915);
    else if (index == 143) return vec3(-0.027571, 0.000000, -0.000383);
    else if (index == 144) return vec3(-0.027550, 0.000000, 0.001150);
    else if (index == 145) return vec3(-0.027444, 0.000000, 0.002679);
    else if (index == 146) return vec3(-0.027252, 0.000000, 0.004200);
    else if (index == 147) return vec3(-0.026977, 0.000000, 0.005708);
    else if (index == 148) return vec3(-0.026618, 0.000000, 0.007198);
    else if (index == 149) return vec3(-0.026177, 0.000000, 0.008667);
    else if (index == 150) return vec3(-0.025655, 0.000000, 0.010108);
    else if (index == 151) return vec3(-0.025053, 0.000000, 0.011518);
    else if (index == 152) return vec3(-0.024374, 0.000000, 0.012893);
    else if (index == 153) return vec3(-0.023620, 0.000000, 0.014227);
    else if (index == 154) return vec3(-0.022793, 0.000000, 0.015518);
    else if (index == 155) return vec3(-0.021895, 0.000000, 0.016761);
    else if (index == 156) return vec3(-0.020930, 0.000000, 0.017952);
    else if (index == 157) return vec3(-0.019900, 0.000000, 0.019087);
    else if (index == 158) return vec3(-0.018809, 0.000000, 0.020164);
    else if (index == 159) return vec3(-0.017659, 0.000000, 0.021178);
    else if (index == 160) return vec3(-0.016455, 0.000000, 0.022126);
    else if (index == 161) return vec3(-0.015200, 0.000000, 0.023007);
    else if (index == 162) return vec3(-0.013898, 0.000000, 0.023816);
    else if (index == 163) return vec3(-0.012553, 0.000000, 0.024551);
    else if (index == 164) return vec3(-0.011169, 0.000000, 0.025211);
    else if (index == 165) return vec3(-0.009750, 0.000000, 0.025793);
    else if (index == 166) return vec3(-0.008302, 0.000000, 0.026295);
    else if (index == 167) return vec3(-0.006828, 0.000000, 0.026715);
    else if (index == 168) return vec3(-0.005332, 0.000000, 0.027054);
    else if (index == 169) return vec3(-0.003821, 0.000000, 0.027308);
    else if (index == 170) return vec3(-0.002297, 0.000000, 0.027478);
    else if (index == 171) return vec3(-0.000767, 0.000000, 0.027563);
    else if (index == 172) return vec3(0.000767, 0.000000, 0.027563);
    else if (index == 173) return vec3(0.002297, 0.000000, 0.027478);
    else if (index == 174) return vec3(0.003821, 0.000000, 0.027308);
    else if (index == 175) return vec3(0.005332, 0.000000, 0.027054);
    else if (index == 176) return vec3(0.006828, 0.000000, 0.026715);
    else if (index == 177) return vec3(0.008302, 0.000000, 0.026295);
    else if (index == 178) return vec3(0.009750, 0.000000, 0.025793);
    else if (index == 179) return vec3(0.011169, 0.000000, 0.025211);
    else if (index == 180) return vec3(0.012553, 0.000000, 0.024551);
    else if (index == 181) return vec3(0.013898, 0.000000, 0.023816);
    else if (index == 182) return vec3(0.015200, 0.000000, 0.023007);
    else if (index == 183) return vec3(0.016455, 0.000000, 0.022126);
    else if (index == 184) return vec3(0.017659, 0.000000, 0.021178);
    else if (index == 185) return vec3(0.018809, 0.000000, 0.020164);
    else if (index == 186) return vec3(0.019900, 0.000000, 0.019087);
    else if (index == 187) return vec3(0.020930, 0.000000, 0.017952);
    else if (index == 188) return vec3(0.021895, 0.000000, 0.016761);
    else if (index == 189) return vec3(0.022793, 0.000000, 0.015518);
    else if (index == 190) return vec3(0.023620, 0.000000, 0.014227);
    else if (index == 191) return vec3(0.024374, 0.000000, 0.012893);
    else if (index == 192) return vec3(0.025053, 0.000000, 0.011518);
    else if (index == 193) return vec3(0.025655, 0.000000, 0.010108);
    else if (index == 194) return vec3(0.026177, 0.000000, 0.008667);
    else if (index == 195) return vec3(0.026618, 0.000000, 0.007198);
    else if (index == 196) return vec3(0.026977, 0.000000, 0.005708);
    else if (index == 197) return vec3(0.027252, 0.000000, 0.004200);
    else if (index == 198) return vec3(0.027444, 0.000000, 0.002679);
    else if (index == 199) return vec3(0.027550, 0.000000, 0.001150);
    else if (index == 200) return vec3(0.027571, 0.000000, -0.000383);
    else if (index == 201) return vec3(0.027508, 0.000000, -0.001915);
    else if (index == 202) return vec3(0.027359, 0.000000, -0.003441);
    else if (index == 203) return vec3(0.027125, 0.000000, -0.004956);
    else if (index == 204) return vec3(0.026808, 0.000000, -0.006456);
    else if (index == 205) return vec3(0.026408, 0.000000, -0.007936);
    else if (index == 206) return vec3(0.025926, 0.000000, -0.009391);
    else if (index == 207) return vec3(0.025364, 0.000000, -0.010817);
    else if (index == 208) return vec3(0.024723, 0.000000, -0.012210);
    else if (index == 209) return vec3(0.024007, 0.000000, -0.013565);
    else if (index == 210) return vec3(0.023216, 0.000000, -0.014878);
    else if (index == 211) return vec3(0.022353, 0.000000, -0.016146);
    else if (index == 212) return vec3(0.021421, 0.000000, -0.017363);
    else if (index == 213) return vec3(0.020423, 0.000000, -0.018526);
    else if (index == 214) return vec3(0.019362, 0.000000, -0.019633);
    else if (index == 215) return vec3(0.018241, 0.000000, -0.020679);
    else if (index == 216) return vec3(0.017063, 0.000000, -0.021660);
    else if (index == 217) return vec3(0.015833, 0.000000, -0.022575);
    else if (index == 218) return vec3(0.014554, 0.000000, -0.023420);
    else if (index == 219) return vec3(0.013230, 0.000000, -0.024193);
    else if (index == 220) return vec3(0.011865, 0.000000, -0.024891);
    else if (index == 221) return vec3(0.010464, 0.000000, -0.025512);
    else if (index == 222) return vec3(0.009030, 0.000000, -0.026054);
    else if (index == 223) return vec3(0.007568, 0.000000, -0.026515);
    else if (index == 224) return vec3(0.006082, 0.000000, -0.026895);
    else if (index == 225) return vec3(0.004578, 0.000000, -0.027191);
    else if (index == 226) return vec3(0.003060, 0.000000, -0.027404);
    else if (index == 227) return vec3(0.001532, 0.000000, -0.027531);
    return vec3(0.0);  // 默认返回
}

// 获取顶点法线
vec3 getNormal(int index) {
    if (index == 0) return vec3(0.000000, 0.000000, -1.000000);
        else if (index == 1) return vec3(0.000000, 0.000000, -1.000000);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 2) return vec3(-0.055575, 0.000000, -0.998455);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 3) return vec3(-0.110978, 0.000000, -0.993823);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 4) return vec3(-0.166038, 0.000000, -0.986119);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 5) return vec3(-0.220584, 0.000000, -0.975368);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 6) return vec3(-0.274449, 0.000000, -0.961602);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 7) return vec3(-0.327466, 0.000000, -0.944863);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 8) return vec3(-0.379470, 0.000000, -0.925204);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 9) return vec3(-0.430302, 0.000000, -0.902685);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 10) return vec3(-0.479803, 0.000000, -0.877376);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 11) return vec3(-0.527822, 0.000000, -0.849355);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 12) return vec3(-0.574209, 0.000000, -0.818709);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 13) return vec3(-0.618821, 0.000000, -0.785532);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 14) return vec3(-0.661520, 0.000000, -0.749927);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 15) return vec3(-0.702175, 0.000000, -0.712004);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 16) return vec3(-0.740659, 0.000000, -0.671881);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 17) return vec3(-0.776854, 0.000000, -0.629680);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 18) return vec3(-0.810648, 0.000000, -0.585534);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 19) return vec3(-0.841936, 0.000000, -0.539577);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 20) return vec3(-0.870622, 0.000000, -0.491953);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 21) return vec3(-0.896616, 0.000000, -0.442808);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 22) return vec3(-0.919840, 0.000000, -0.392294);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 23) return vec3(-0.940220, 0.000000, -0.340568);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 24) return vec3(-0.957694, 0.000000, -0.287790);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 25) return vec3(-0.972207, 0.000000, -0.234121);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 26) return vec3(-0.983716, 0.000000, -0.179729);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 27) return vec3(-0.992184, 0.000000, -0.124782);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 28) return vec3(-0.997586, 0.000000, -0.069448);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 29) return vec3(-0.999903, 0.000000, -0.013900);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 30) return vec3(-0.999131, 0.000000, 0.041690);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 31) return vec3(-0.995270, 0.000000, 0.097152);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 32) return vec3(-0.988332, 0.000000, 0.152314);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 33) return vec3(-0.978340, 0.000000, 0.207005);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 34) return vec3(-0.965324, 0.000000, 0.261056);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 35) return vec3(-0.949324, 0.000000, 0.314300);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 36) return vec3(-0.930389, 0.000000, 0.366573);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 37) return vec3(-0.908579, 0.000000, 0.417713);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 38) return vec3(-0.883961, 0.000000, 0.467561);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 39) return vec3(-0.856610, 0.000000, 0.515965);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 40) return vec3(-0.826611, 0.000000, 0.562773);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 41) return vec3(-0.794058, 0.000000, 0.607842);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 42) return vec3(-0.759050, 0.000000, 0.651032);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 43) return vec3(-0.721696, 0.000000, 0.692210);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 44) return vec3(-0.682111, 0.000000, 0.731248);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 45) return vec3(-0.640418, 0.000000, 0.768026);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 46) return vec3(-0.596746, 0.000000, 0.802431);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 47) return vec3(-0.551228, 0.000000, 0.834354);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 48) return vec3(-0.504007, 0.000000, 0.863699);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 49) return vec3(-0.455229, 0.000000, 0.890375);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 50) return vec3(-0.405043, 0.000000, 0.914298);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 51) return vec3(-0.353605, 0.000000, 0.935395);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 52) return vec3(-0.301074, 0.000000, 0.953601);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 53) return vec3(-0.247613, 0.000000, 0.968859);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 54) return vec3(-0.193386, 0.000000, 0.981123);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 55) return vec3(-0.138561, 0.000000, 0.990354);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 56) return vec3(-0.083308, 0.000000, 0.996524);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 57) return vec3(-0.027798, 0.000000, 0.999614);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 58) return vec3(0.027798, 0.000000, 0.999614);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 59) return vec3(0.083308, 0.000000, 0.996524);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 60) return vec3(0.138561, 0.000000, 0.990354);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 61) return vec3(0.193386, 0.000000, 0.981123);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 62) return vec3(0.247613, 0.000000, 0.968859);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 63) return vec3(0.301074, 0.000000, 0.953601);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 64) return vec3(0.353605, 0.000000, 0.935395);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 65) return vec3(0.405043, 0.000000, 0.914298);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 66) return vec3(0.455229, 0.000000, 0.890375);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 67) return vec3(0.504007, 0.000000, 0.863699);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 68) return vec3(0.551228, 0.000000, 0.834354);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 69) return vec3(0.596746, 0.000000, 0.802431);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 70) return vec3(0.640418, 0.000000, 0.768026);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 71) return vec3(0.682111, 0.000000, 0.731248);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 72) return vec3(0.721696, 0.000000, 0.692210);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 73) return vec3(0.759050, 0.000000, 0.651032);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 74) return vec3(0.794058, 0.000000, 0.607842);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 75) return vec3(0.826611, 0.000000, 0.562773);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 76) return vec3(0.856610, 0.000000, 0.515965);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 77) return vec3(0.883961, 0.000000, 0.467561);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 78) return vec3(0.908579, 0.000000, 0.417713);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 79) return vec3(0.930389, 0.000000, 0.366573);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 80) return vec3(0.949324, 0.000000, 0.314300);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 81) return vec3(0.965324, 0.000000, 0.261056);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 82) return vec3(0.978340, 0.000000, 0.207005);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 83) return vec3(0.988332, 0.000000, 0.152314);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 84) return vec3(0.995270, 0.000000, 0.097152);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 85) return vec3(0.999131, 0.000000, 0.041690);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 86) return vec3(0.999903, 0.000000, -0.013900);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 87) return vec3(0.997586, 0.000000, -0.069448);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 88) return vec3(0.992184, 0.000000, -0.124782);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 89) return vec3(0.983716, 0.000000, -0.179729);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 90) return vec3(0.972207, 0.000000, -0.234121);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 91) return vec3(0.957694, 0.000000, -0.287790);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 92) return vec3(0.940220, 0.000000, -0.340568);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 93) return vec3(0.919840, 0.000000, -0.392294);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 94) return vec3(0.896616, 0.000000, -0.442808);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 95) return vec3(0.870622, 0.000000, -0.491953);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 96) return vec3(0.841936, 0.000000, -0.539577);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 97) return vec3(0.810648, 0.000000, -0.585534);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 98) return vec3(0.776854, 0.000000, -0.629680);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 99) return vec3(0.740659, 0.000000, -0.671881);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 100) return vec3(0.702175, 0.000000, -0.712004);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 101) return vec3(0.661520, 0.000000, -0.749927);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 102) return vec3(0.618821, 0.000000, -0.785532);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 103) return vec3(0.574209, 0.000000, -0.818709);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 104) return vec3(0.527822, 0.000000, -0.849355);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 105) return vec3(0.479803, 0.000000, -0.877376);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 106) return vec3(0.430302, 0.000000, -0.902685);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 107) return vec3(0.379470, 0.000000, -0.925204);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 108) return vec3(0.327466, 0.000000, -0.944863);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 109) return vec3(0.274449, 0.000000, -0.961602);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 110) return vec3(0.220584, 0.000000, -0.975368);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 111) return vec3(0.166038, 0.000000, -0.986119);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 112) return vec3(0.110978, 0.000000, -0.993823);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 113) return vec3(0.055575, 0.000000, -0.998455);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 114) return vec3(0.000000, 0.000000, -1.000000);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 115) return vec3(0.000000, 0.000000, -1.000000);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 116) return vec3(-0.055575, 0.000000, -0.998455);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 117) return vec3(-0.110978, 0.000000, -0.993823);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 118) return vec3(-0.166038, 0.000000, -0.986119);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 119) return vec3(-0.220584, 0.000000, -0.975368);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 120) return vec3(-0.274449, 0.000000, -0.961602);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 121) return vec3(-0.327466, 0.000000, -0.944863);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 122) return vec3(-0.379470, 0.000000, -0.925204);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 123) return vec3(-0.430302, 0.000000, -0.902685);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 124) return vec3(-0.479803, 0.000000, -0.877376);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 125) return vec3(-0.527822, 0.000000, -0.849355);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 126) return vec3(-0.574209, 0.000000, -0.818709);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 127) return vec3(-0.618821, 0.000000, -0.785532);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 128) return vec3(-0.661520, 0.000000, -0.749927);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 129) return vec3(-0.702175, 0.000000, -0.712004);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 130) return vec3(-0.740659, 0.000000, -0.671881);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 131) return vec3(-0.776854, 0.000000, -0.629680);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 132) return vec3(-0.810648, 0.000000, -0.585534);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 133) return vec3(-0.841936, 0.000000, -0.539577);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 134) return vec3(-0.870622, 0.000000, -0.491953);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 135) return vec3(-0.896616, 0.000000, -0.442808);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 136) return vec3(-0.919840, 0.000000, -0.392294);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 137) return vec3(-0.940220, 0.000000, -0.340568);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 138) return vec3(-0.957694, 0.000000, -0.287790);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 139) return vec3(-0.972207, 0.000000, -0.234121);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 140) return vec3(-0.983716, 0.000000, -0.179729);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 141) return vec3(-0.992184, 0.000000, -0.124782);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 142) return vec3(-0.997586, 0.000000, -0.069448);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 143) return vec3(-0.999903, 0.000000, -0.013900);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 144) return vec3(-0.999131, 0.000000, 0.041690);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 145) return vec3(-0.995270, 0.000000, 0.097152);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 146) return vec3(-0.988332, 0.000000, 0.152314);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 147) return vec3(-0.978340, 0.000000, 0.207005);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 148) return vec3(-0.965324, 0.000000, 0.261056);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 149) return vec3(-0.949324, 0.000000, 0.314300);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 150) return vec3(-0.930389, 0.000000, 0.366573);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 151) return vec3(-0.908579, 0.000000, 0.417713);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 152) return vec3(-0.883961, 0.000000, 0.467561);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 153) return vec3(-0.856610, 0.000000, 0.515965);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 154) return vec3(-0.826611, 0.000000, 0.562773);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 155) return vec3(-0.794058, 0.000000, 0.607842);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 156) return vec3(-0.759050, 0.000000, 0.651032);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 157) return vec3(-0.721696, 0.000000, 0.692210);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 158) return vec3(-0.682111, 0.000000, 0.731248);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 159) return vec3(-0.640418, 0.000000, 0.768026);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 160) return vec3(-0.596746, 0.000000, 0.802431);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 161) return vec3(-0.551228, 0.000000, 0.834354);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 162) return vec3(-0.504007, 0.000000, 0.863699);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 163) return vec3(-0.455229, 0.000000, 0.890375);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 164) return vec3(-0.405043, 0.000000, 0.914298);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 165) return vec3(-0.353605, 0.000000, 0.935395);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 166) return vec3(-0.301074, 0.000000, 0.953601);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 167) return vec3(-0.247613, 0.000000, 0.968859);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 168) return vec3(-0.193386, 0.000000, 0.981123);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 169) return vec3(-0.138561, 0.000000, 0.990354);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 170) return vec3(-0.083308, 0.000000, 0.996524);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 171) return vec3(-0.027798, 0.000000, 0.999614);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 172) return vec3(0.027798, 0.000000, 0.999614);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 173) return vec3(0.083308, 0.000000, 0.996524);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 174) return vec3(0.138561, 0.000000, 0.990354);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 175) return vec3(0.193386, 0.000000, 0.981123);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 176) return vec3(0.247613, 0.000000, 0.968859);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 177) return vec3(0.301074, 0.000000, 0.953601);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 178) return vec3(0.353605, 0.000000, 0.935395);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 179) return vec3(0.405043, 0.000000, 0.914298);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 180) return vec3(0.455229, 0.000000, 0.890375);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 181) return vec3(0.504007, 0.000000, 0.863699);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 182) return vec3(0.551228, 0.000000, 0.834354);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 183) return vec3(0.596746, 0.000000, 0.802431);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 184) return vec3(0.640418, 0.000000, 0.768026);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 185) return vec3(0.682111, 0.000000, 0.731248);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 186) return vec3(0.721696, 0.000000, 0.692210);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 187) return vec3(0.759050, 0.000000, 0.651032);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 188) return vec3(0.794058, 0.000000, 0.607842);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 189) return vec3(0.826611, 0.000000, 0.562773);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 190) return vec3(0.856610, 0.000000, 0.515965);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 191) return vec3(0.883961, 0.000000, 0.467561);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 192) return vec3(0.908579, 0.000000, 0.417713);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 193) return vec3(0.930389, 0.000000, 0.366573);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 194) return vec3(0.949324, 0.000000, 0.314300);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 195) return vec3(0.965324, 0.000000, 0.261056);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 196) return vec3(0.978340, 0.000000, 0.207005);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 197) return vec3(0.988332, 0.000000, 0.152314);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 198) return vec3(0.995270, 0.000000, 0.097152);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 199) return vec3(0.999131, 0.000000, 0.041690);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 200) return vec3(0.999903, 0.000000, -0.013900);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 201) return vec3(0.997586, 0.000000, -0.069448);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 202) return vec3(0.992184, 0.000000, -0.124782);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 203) return vec3(0.983716, 0.000000, -0.179729);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 204) return vec3(0.972207, 0.000000, -0.234121);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 205) return vec3(0.957694, 0.000000, -0.287790);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 206) return vec3(0.940220, 0.000000, -0.340568);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 207) return vec3(0.919840, 0.000000, -0.392294);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 208) return vec3(0.896616, 0.000000, -0.442808);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 209) return vec3(0.870622, 0.000000, -0.491953);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 210) return vec3(0.841936, 0.000000, -0.539577);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 211) return vec3(0.810648, 0.000000, -0.585534);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 212) return vec3(0.776854, 0.000000, -0.629680);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 213) return vec3(0.740659, 0.000000, -0.671881);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 214) return vec3(0.702175, 0.000000, -0.712004);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 215) return vec3(0.661520, 0.000000, -0.749927);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 216) return vec3(0.618821, 0.000000, -0.785532);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 217) return vec3(0.574209, 0.000000, -0.818709);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 218) return vec3(0.527822, 0.000000, -0.849355);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 219) return vec3(0.479803, 0.000000, -0.877376);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 220) return vec3(0.430302, 0.000000, -0.902685);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 221) return vec3(0.379470, 0.000000, -0.925204);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 222) return vec3(0.327466, 0.000000, -0.944863);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 223) return vec3(0.274449, 0.000000, -0.961602);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 224) return vec3(0.220584, 0.000000, -0.975368);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 225) return vec3(0.166038, 0.000000, -0.986119);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 226) return vec3(0.110978, 0.000000, -0.993823);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 227) return vec3(0.055575, 0.000000, -0.998455);
    return vec3(0.0, 1.0, 0.0);  // 默认返回
}

// 获取三角形索引
ivec3 getTriangle(int index) {
    if (index == 0) return ivec3(116, 1, 0);
        else if (index == 1) return ivec3(116, 2, 1);
    else if (index == 2) return ivec3(117, 3, 2);
    else if (index == 3) return ivec3(117, 4, 3);
    else if (index == 4) return ivec3(117, 2, 116);
    else if (index == 5) return ivec3(118, 4, 117);
    else if (index == 6) return ivec3(119, 5, 4);
    else if (index == 7) return ivec3(119, 6, 5);
    else if (index == 8) return ivec3(119, 4, 118);
    else if (index == 9) return ivec3(120, 6, 119);
    else if (index == 10) return ivec3(121, 7, 6);
    else if (index == 11) return ivec3(121, 8, 7);
    else if (index == 12) return ivec3(121, 6, 120);
    else if (index == 13) return ivec3(122, 8, 121);
    else if (index == 14) return ivec3(123, 9, 8);
    else if (index == 15) return ivec3(123, 8, 122);
    else if (index == 16) return ivec3(124, 10, 9);
    else if (index == 17) return ivec3(124, 11, 10);
    else if (index == 18) return ivec3(124, 9, 123);
    else if (index == 19) return ivec3(125, 12, 11);
    else if (index == 20) return ivec3(125, 11, 124);
    else if (index == 21) return ivec3(126, 12, 125);
    else if (index == 22) return ivec3(127, 13, 12);
    else if (index == 23) return ivec3(127, 12, 126);
    else if (index == 24) return ivec3(128, 14, 13);
    else if (index == 25) return ivec3(128, 13, 127);
    else if (index == 26) return ivec3(129, 15, 14);
    else if (index == 27) return ivec3(129, 14, 128);
    else if (index == 28) return ivec3(130, 16, 15);
    else if (index == 29) return ivec3(130, 15, 129);
    else if (index == 30) return ivec3(131, 17, 16);
    else if (index == 31) return ivec3(131, 16, 130);
    else if (index == 32) return ivec3(132, 18, 17);
    else if (index == 33) return ivec3(132, 17, 131);
    else if (index == 34) return ivec3(133, 19, 18);
    else if (index == 35) return ivec3(133, 20, 19);
    else if (index == 36) return ivec3(133, 18, 132);
    else if (index == 37) return ivec3(134, 20, 133);
    else if (index == 38) return ivec3(135, 20, 134);
    else if (index == 39) return ivec3(135, 21, 20);
    else if (index == 40) return ivec3(136, 21, 135);
    else if (index == 41) return ivec3(136, 22, 21);
    else if (index == 42) return ivec3(136, 23, 22);
    else if (index == 43) return ivec3(137, 23, 136);
    else if (index == 44) return ivec3(138, 24, 23);
    else if (index == 45) return ivec3(138, 23, 137);
    else if (index == 46) return ivec3(139, 25, 24);
    else if (index == 47) return ivec3(139, 24, 138);
    else if (index == 48) return ivec3(140, 26, 25);
    else if (index == 49) return ivec3(140, 25, 139);
    else if (index == 50) return ivec3(141, 27, 26);
    else if (index == 51) return ivec3(141, 28, 27);
    else if (index == 52) return ivec3(141, 26, 140);
    else if (index == 53) return ivec3(142, 29, 28);
    else if (index == 54) return ivec3(142, 28, 141);
    else if (index == 55) return ivec3(143, 30, 29);
    else if (index == 56) return ivec3(143, 29, 142);
    else if (index == 57) return ivec3(144, 30, 143);
    else if (index == 58) return ivec3(145, 31, 30);
    else if (index == 59) return ivec3(145, 30, 144);
    else if (index == 60) return ivec3(146, 32, 31);
    else if (index == 61) return ivec3(146, 33, 32);
    else if (index == 62) return ivec3(146, 31, 145);
    else if (index == 63) return ivec3(147, 34, 33);
    else if (index == 64) return ivec3(147, 33, 146);
    else if (index == 65) return ivec3(148, 34, 147);
    else if (index == 66) return ivec3(149, 35, 34);
    else if (index == 67) return ivec3(149, 36, 35);
    else if (index == 68) return ivec3(149, 34, 148);
    else if (index == 69) return ivec3(150, 36, 149);
    else if (index == 70) return ivec3(151, 37, 36);
    else if (index == 71) return ivec3(151, 36, 150);
    else if (index == 72) return ivec3(152, 38, 37);
    else if (index == 73) return ivec3(152, 37, 151);
    else if (index == 74) return ivec3(153, 39, 38);
    else if (index == 75) return ivec3(153, 38, 152);
    else if (index == 76) return ivec3(154, 40, 39);
    else if (index == 77) return ivec3(154, 39, 153);
    else if (index == 78) return ivec3(155, 41, 40);
    else if (index == 79) return ivec3(155, 40, 154);
    else if (index == 80) return ivec3(156, 42, 41);
    else if (index == 81) return ivec3(156, 41, 155);
    else if (index == 82) return ivec3(157, 43, 42);
    else if (index == 83) return ivec3(157, 42, 156);
    else if (index == 84) return ivec3(158, 44, 43);
    else if (index == 85) return ivec3(158, 43, 157);
    else if (index == 86) return ivec3(159, 44, 158);
    else if (index == 87) return ivec3(159, 45, 44);
    else if (index == 88) return ivec3(160, 45, 159);
    else if (index == 89) return ivec3(160, 46, 45);
    else if (index == 90) return ivec3(160, 47, 46);
    else if (index == 91) return ivec3(161, 47, 160);
    else if (index == 92) return ivec3(161, 48, 47);
    else if (index == 93) return ivec3(162, 48, 161);
    else if (index == 94) return ivec3(162, 49, 48);
    else if (index == 95) return ivec3(163, 49, 162);
    else if (index == 96) return ivec3(164, 49, 163);
    else if (index == 97) return ivec3(164, 50, 49);
    else if (index == 98) return ivec3(165, 50, 164);
    else if (index == 99) return ivec3(165, 51, 50);
    else if (index == 100) return ivec3(166, 51, 165);
    else if (index == 101) return ivec3(166, 52, 51);
    else if (index == 102) return ivec3(167, 52, 166);
    else if (index == 103) return ivec3(167, 53, 52);
    else if (index == 104) return ivec3(168, 53, 167);
    else if (index == 105) return ivec3(168, 54, 53);
    else if (index == 106) return ivec3(169, 54, 168);
    else if (index == 107) return ivec3(169, 55, 54);
    else if (index == 108) return ivec3(170, 55, 169);
    else if (index == 109) return ivec3(170, 56, 55);
    else if (index == 110) return ivec3(171, 56, 170);
    else if (index == 111) return ivec3(171, 57, 56);
    else if (index == 112) return ivec3(172, 57, 171);
    else if (index == 113) return ivec3(172, 58, 57);
    else if (index == 114) return ivec3(173, 59, 58);
    else if (index == 115) return ivec3(173, 58, 172);
    else if (index == 116) return ivec3(174, 60, 59);
    else if (index == 117) return ivec3(174, 59, 173);
    else if (index == 118) return ivec3(175, 61, 60);
    else if (index == 119) return ivec3(175, 60, 174);
    else if (index == 120) return ivec3(176, 62, 61);
    else if (index == 121) return ivec3(176, 61, 175);
    else if (index == 122) return ivec3(177, 63, 62);
    else if (index == 123) return ivec3(177, 62, 176);
    else if (index == 124) return ivec3(178, 64, 63);
    else if (index == 125) return ivec3(178, 63, 177);
    else if (index == 126) return ivec3(179, 65, 64);
    else if (index == 127) return ivec3(179, 64, 178);
    else if (index == 128) return ivec3(180, 66, 65);
    else if (index == 129) return ivec3(180, 65, 179);
    else if (index == 130) return ivec3(181, 67, 66);
    else if (index == 131) return ivec3(181, 66, 180);
    else if (index == 132) return ivec3(182, 68, 67);
    else if (index == 133) return ivec3(182, 67, 181);
    else if (index == 134) return ivec3(183, 68, 182);
    else if (index == 135) return ivec3(183, 69, 68);
    else if (index == 136) return ivec3(183, 70, 69);
    else if (index == 137) return ivec3(184, 70, 183);
    else if (index == 138) return ivec3(185, 70, 184);
    else if (index == 139) return ivec3(185, 71, 70);
    else if (index == 140) return ivec3(185, 72, 71);
    else if (index == 141) return ivec3(186, 72, 185);
    else if (index == 142) return ivec3(187, 72, 186);
    else if (index == 143) return ivec3(187, 73, 72);
    else if (index == 144) return ivec3(188, 73, 187);
    else if (index == 145) return ivec3(188, 74, 73);
    else if (index == 146) return ivec3(189, 74, 188);
    else if (index == 147) return ivec3(189, 75, 74);
    else if (index == 148) return ivec3(189, 76, 75);
    else if (index == 149) return ivec3(190, 76, 189);
    else if (index == 150) return ivec3(191, 76, 190);
    else if (index == 151) return ivec3(191, 77, 76);
    else if (index == 152) return ivec3(192, 77, 191);
    else if (index == 153) return ivec3(192, 78, 77);
    else if (index == 154) return ivec3(193, 78, 192);
    else if (index == 155) return ivec3(193, 79, 78);
    else if (index == 156) return ivec3(193, 80, 79);
    else if (index == 157) return ivec3(194, 80, 193);
    else if (index == 158) return ivec3(194, 81, 80);
    else if (index == 159) return ivec3(195, 81, 194);
    else if (index == 160) return ivec3(196, 81, 195);
    else if (index == 161) return ivec3(196, 82, 81);
    else if (index == 162) return ivec3(197, 82, 196);
    else if (index == 163) return ivec3(197, 83, 82);
    else if (index == 164) return ivec3(198, 83, 197);
    else if (index == 165) return ivec3(198, 84, 83);
    else if (index == 166) return ivec3(198, 85, 84);
    else if (index == 167) return ivec3(199, 85, 198);
    else if (index == 168) return ivec3(200, 85, 199);
    else if (index == 169) return ivec3(200, 86, 85);
    else if (index == 170) return ivec3(201, 86, 200);
    else if (index == 171) return ivec3(201, 87, 86);
    else if (index == 172) return ivec3(201, 88, 87);
    else if (index == 173) return ivec3(202, 88, 201);
    else if (index == 174) return ivec3(202, 89, 88);
    else if (index == 175) return ivec3(203, 89, 202);
    else if (index == 176) return ivec3(204, 89, 203);
    else if (index == 177) return ivec3(204, 90, 89);
    else if (index == 178) return ivec3(204, 91, 90);
    else if (index == 179) return ivec3(205, 91, 204);
    else if (index == 180) return ivec3(206, 92, 91);
    else if (index == 181) return ivec3(206, 93, 92);
    else if (index == 182) return ivec3(206, 91, 205);
    else if (index == 183) return ivec3(207, 94, 93);
    else if (index == 184) return ivec3(207, 93, 206);
    else if (index == 185) return ivec3(208, 94, 207);
    else if (index == 186) return ivec3(209, 94, 208);
    else if (index == 187) return ivec3(209, 95, 94);
    else if (index == 188) return ivec3(209, 96, 95);
    else if (index == 189) return ivec3(210, 96, 209);
    else if (index == 190) return ivec3(210, 97, 96);
    else if (index == 191) return ivec3(211, 97, 210);
    else if (index == 192) return ivec3(212, 97, 211);
    else if (index == 193) return ivec3(212, 98, 97);
    else if (index == 194) return ivec3(213, 98, 212);
    else if (index == 195) return ivec3(213, 99, 98);
    else if (index == 196) return ivec3(214, 101, 100);
    else if (index == 197) return ivec3(214, 99, 213);
    else if (index == 198) return ivec3(214, 100, 99);
    else if (index == 199) return ivec3(215, 101, 214);
    else if (index == 200) return ivec3(216, 102, 101);
    else if (index == 201) return ivec3(216, 103, 102);
    else if (index == 202) return ivec3(216, 101, 215);
    else if (index == 203) return ivec3(217, 103, 216);
    else if (index == 204) return ivec3(218, 104, 103);
    else if (index == 205) return ivec3(218, 103, 217);
    else if (index == 206) return ivec3(219, 105, 104);
    else if (index == 207) return ivec3(219, 104, 218);
    else if (index == 208) return ivec3(220, 106, 105);
    else if (index == 209) return ivec3(220, 105, 219);
    else if (index == 210) return ivec3(221, 107, 106);
    else if (index == 211) return ivec3(221, 106, 220);
    else if (index == 212) return ivec3(222, 108, 107);
    else if (index == 213) return ivec3(222, 109, 108);
    else if (index == 214) return ivec3(222, 107, 221);
    else if (index == 215) return ivec3(223, 110, 109);
    else if (index == 216) return ivec3(223, 109, 222);
    else if (index == 217) return ivec3(224, 111, 110);
    else if (index == 218) return ivec3(224, 110, 223);
    else if (index == 219) return ivec3(225, 111, 224);
    else if (index == 220) return ivec3(226, 112, 111);
    else if (index == 221) return ivec3(226, 111, 225);
    else if (index == 222) return ivec3(227, 113, 112);
    else if (index == 223) return ivec3(227, 112, 226);
    else if (index == 224) return ivec3(115, 114, 113);
    else if (index == 225) return ivec3(115, 113, 227);
    return ivec3(0);  // 默认返回
}

// 光线与三角形相交检测
bool rayTriangleIntersect(vec3 rayOrigin, vec3 rayDir, vec3 v0, vec3 v1, vec3 v2, out float t) {
    vec3 e1 = v1 - v0;
    vec3 e2 = v2 - v0;
    vec3 p = cross(rayDir, e2);
    float det = dot(e1, p);
    
    // 如果行列式接近零，光线与三角形平行
    if (abs(det) < 0.0001) return false;
    
    float inv_det = 1.0 / det;
    vec3 s = rayOrigin - v0;
    float u = dot(s, p) * inv_det;
    
    if (u < 0.0 || u > 1.0) return false;
    
    vec3 q = cross(s, e1);
    float v = dot(rayDir, q) * inv_det;
    
    if (v < 0.0 || u + v > 1.0) return false;
    
    t = dot(e2, q) * inv_det;
    
    return (t > 0.0001);
}

// 渲染模型
vec4 renderModel(vec3 rayOrigin, vec3 rayDir) {
    float minT = 1000000.0;
    vec3 hitNormal = vec3(0.0, 1.0, 0.0);
    bool hit = false;
    
    // 遍历所有三角形
    for (int i = 0; i < TRIANGLE_COUNT; i++) {
        ivec3 tri = getTriangle(i);
        vec3 v0 = getPosition(tri.x);
        vec3 v1 = getPosition(tri.y);
        vec3 v2 = getPosition(tri.z);
        
        float t;
        if (rayTriangleIntersect(rayOrigin, rayDir, v0, v1, v2, t)) {
            if (t < minT) {
                minT = t;
                // 计算命中点的法线（简单平均三个顶点的法线）
                hitNormal = normalize(getNormal(tri.x) + getNormal(tri.y) + getNormal(tri.z));
                hit = true;
            }
        }
    }
    
    if (hit) {
        // 简单的光照计算
        vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
        float diff = max(dot(hitNormal, lightDir), 0.2);
        vec3 color = vec3(0.6, 0.6, 0.8) * diff;
        return vec4(color, 1.0);
    }
    
    return vec4(0.0);  // 没有命中
}
