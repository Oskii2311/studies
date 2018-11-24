library(genalg)

#5X5
kolumny5 <- data.frame(
  c(1,1,0),
  c(1,2,0),
  c(3,0,0),
  c(2,0,0),
  c(1,1,0)
)
wiersze5 <- data.frame(
  c(1,0,0),
  c(3,0,0),
  c(1,0,0),
  c(5,0,0),
  c(1,1,0)
)

##10x10
kolumny <- data.frame(
  c(5,1,0),
  c(2,3,1),
  c(1,2,2),
  c(8,1,0),
  c(7,1,0),
  c(6,1,0),
  c(2,3,1),
  c(1,3,1),
  c(2,3,2),
  c(7,1,0)
)

wiersze <- data.frame(
  c(2,0,0,0),
  c(9,0,1,0),
  c(2,4,2,0),
  c(1,3,1,0),
  c(1,4,2,0),
  c(10,0,0,0),
  c(10,0,0,0),
  c(1,1,1,1),
  c(0,0,1,1),
  c(10,0,0,0)
)
##motyl
wartosciKolumn <- data.frame(
  c(3,2,0,0),
  c(1,3,2,0),
  c(2,1,2,1),
  c(2,1,1,0),
  c(2,1,0,0),
  c(1,2,1,0),
  c(6,6,0,0),
  c(11,0,0,0),
  c(6,6,0,0),
  c(1,1,1,0),
  c(1,1,1,0),
  c(1,1,0,0),
  c(1,1,2,1),
  c(1,1,2,0),
  c(3,0,0,0)
)
wartosciWierszy <- data.frame(
  c(1,1,0,0,0,0),
  c(1,1,0,0,0,0),
  c(1,1,0,0,0,0),
  c(1,1,0,0,0,0),
  c(1,3,0,0,0,0),
  c(1,2,3,3,0,0),
  c(1,1,2,1,1,1),
  c(1,5,1,1,0,0),
  c(2,3,1,0,0,0),
  c(2,3,1,0,0,0),
  c(2,3,1,0,0,0),
  c(1,3,1,0,0,0),
  c(1,1,3,1,1,0),
  c(2,5,1,0,0,0),
  c(4,1,4,0,0,0)
)

petla <- function(i,k,chromosom,array) {
  wynik = vector("logical")
  for(o in k:length(chromosom)){
    if(chromosom[o] == 1) {
      wynik = c(wynik, TRUE)
      if(length(wynik) == array[i] ) {
        if(chromosom[o+1] != 1 || (o+1) > length(chromosom)-k) {
          return(c(o+1))
        } else {
          return(c(1))
        }
      }
    }
    if((o+1) > length(chromosom)-k) {
      return(1)
    }
  }
}

sprawdzCzyLiczbySieZgadzaja <- function(chromosom, array) {
  
  czyLiczbaJedynekZeSpacjamiSieZgadza= vector("logical")
  j = 1;
  y <- array[ array != 0  ]

for(i in 1:length(array)) {
  czyZero = petla(i,j,chromosom, y);
  j = czyZero[1]
  if(j == 1) {
   return(0)
  } else {
    czyLiczbaJedynekZeSpacjamiSieZgadza= c(czyLiczbaJedynekZeSpacjamiSieZgadza, TRUE);
  }
  if(length(y) == length(czyLiczbaJedynekZeSpacjamiSieZgadza)) {
    return(0.25)
  }
}
}

fitnessFunc <- function(chr) {
  macierz  = matrix( 
       chr, 
       nrow=5, 
       ncol=5) 
  correctness = 0;
  for (i in 1:nrow(macierz)) {
    if(sum(macierz[,i]) == sum(wiersze5[i])){
      correctness = correctness+0.25;
      czyDodac = sprawdzCzyLiczbySieZgadzaja(macierz[,i],wiersze5[,i])
      correctness = correctness + czyDodac
    } 
  }
  for(i in 1:ncol(macierz)) {
    if(sum(macierz[i,]) == sum(kolumny5[i])){
      correctness = correctness+0.25;
      czyDodac = sprawdzCzyLiczbySieZgadzaja(macierz[i,],kolumny5[,i])
      correctness = correctness + czyDodac
    } 
  }

   return(-correctness)
}

start_time <- Sys.time()
nonogramGenAlg <- rbga.bin(size = 25, popSize = 200, iters = 100,
                         mutationChance = 0.05, elitism = T, evalFunc = fitnessFunc)
summary(nonogramGenAlg, echo=TRUE)
end_time <- Sys.time()

czasDla5 = end_time - start_time
czasy = c(czasDla15,czasDla10,czasDla5)
wielkosci = c(225,100,25)
plot(x =wielkosci,y= czasy, type='b',xlab="wielkosci chromosomow",ylab="czas w sekundach",ylim=c(0, 130),xlim=c(0, 250))

nonogramGenAlg