import sys
x = int(sys.argv[1])
#x = int(10)
from statsmodels.tsa.arima_model import ARIMAResults

ARIMA = ARIMAResults.load('model.pkl')


output  = ARIMA.forecast(x)

for i in output:
  print(round(i), end = " ")

