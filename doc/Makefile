###############################################################
#  Trip Denton
#  tdenton@yahoo.com
#  
#  
#
#  DESCRIPTION: Makefile 
#					 make doc 

#
#
#  
###############################################################
 
BIBTEX=bibtex
LATEX=pdflatex
DVIPS=dvips -P pdf -G0 -f 
DVIPDF=dvipdf
PS2PDF=ps2pdf
INDEX=makeindex


DOC=ss1
TEXFILES=*.tex
FIGS=./figs/*
IMGS=*.eps
OTHER= *.sty	*.bib	 

BIB_FILE=ref.bib
 
DIST_FILES=Makefile $(TEXFILES) $(FIGS) $(IMGS) $(OTHER) 
TAR_FILE=$(DOC).tar.gz 
TAR_BASE=$(DOC)

SUBMIT_TAR=ss1.tar.gz	
SUBMIT_FILES= *.eps *.dvi				

###############################################################
# some implicit rules
                     
# %.pdf : %.dvi
#    $(DVIPDF) $< $@
							 
%.dvi : %.tex $(BIB_FILE)
	$(LATEX) $<
	$(LATEX) $<
	$(BIBTEX) $*
	$(LATEX) $<
	$(LATEX) $<

%.ps : %.dvi
	make ps 
                     
###############################################################

all: pdf	ps

# convert the ps to a pdf   
pdf: 	$(DOC).ps $(DOC).dvi
		$(PS2PDF) $(DOC).ps $(DOC).pdf
								 
ps: 	$(DOC).dvi
		$(DVIPS) $(DOC) -o $(DOC).ps

             
clean: 
		rm -f *.dvi *.log *.aux *.bbl *.blg *.pdf  $(DOC).ps
       
           
dist:  
		rm -f $(TAR_FILE)
		tar -zcf $(TAR_FILE) $(DIST_FILES)
   
tarfile:  
		rm -f $(TAR_FILE).tar
		tar -zcf $(TAR_FILE) $(DIST_FILES)

						 
sub:
		rm -f $(SUBMIT_TAR)
		tar -zcf $(SUBMIT_TAR) $(SUBMIT_FILES)
						 

