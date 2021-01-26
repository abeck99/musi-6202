import pysndfile as sf
import collections

c1 = [0] * 201
x = sf.sndio.read("orchestra.wav")
for samp in x[0]:
  for f in samp:
    c1[max(0, min(200, int(round(f*100,0))+100))] += 1

c2 = [0] * 201
x2 = sf.sndio.read("talking.wav")
for samp in x2[0]:
  for f in samp:
    c2[max(0, min(200, int(round(f*100,0))+100))] += 1

totalC1 = 0.0
totalC2 = 0.0
for i in range(0, 201):
  totalC1 += c1[i]
  totalC2 += c2[i]
totalC1 = float(totalC1)
totalC2 = float(totalC2)

for i in range(0, 201):
  c1[i] = float(c1[i]) / totalC1
  c2[i] = float(c2[i]) / totalC2

with open('orc-talk-dist.json', 'w') as f:
  f.write("[\n")
  isFirst = True
  for k in range(0, 201):
    f.write("  {\n")
    f.write("    \"name\": " + str((float(k)/100.0)-1.0) + ",\n")
    f.write("    \"orch\": " + str(c2[k]) + ",\n")
    f.write("    \"talk\": " + str(c1[k]) + "\n")
    if k == 200:
      f.write("  }\n")
    else:
      f.write("  },\n")
  f.write("]")
